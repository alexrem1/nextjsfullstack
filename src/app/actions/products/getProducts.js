"use server";

import { db } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";

export default async function getProducts(
  category = null,
  sort = null,
  pdp = null,
  searchQuery = null
) {
  noStore();
  let connection;

  let q = `
    SELECT 
      p.productId, 
      p.productName, 
      p.productDesc, 
      p.productImage, 
      p.productCat,
      v.productVariantId, 
      v.productVariantProductId,
      v.productVariantName, 
      v.productVariantPrice, 
      v.productVariantStock,
      r.reviewsId,
      r.idProduct,
      r.comment,
      r.rating,
      r.name
    FROM 
      products p
    LEFT JOIN 
      productVariant v ON p.productId = v.productVariantProductId
    LEFT JOIN 
      reviews r ON p.productId = r.idProduct
  `;

  const queryParams = [];

  if (category) {
    q += " WHERE p.productCat = ?";
    queryParams.push(category);
  }

  if (pdp) {
    q += " WHERE p.productId = ?";
    queryParams.push(pdp);
  }

  if (searchQuery) {
    q += " WHERE" + " p.productName LIKE ?";
    queryParams.push(`%${searchQuery}%`);
  }

  try {
    connection = await db.getConnection();
    const [rows] = await connection.query(q, queryParams);

    if (pdp) {
      // Return a single product if pdp is provided
      if (rows.length === 0) {
        return null;
      }

      const product = {
        productId: rows[0].productId,
        productName: rows[0].productName,
        productDesc: rows[0].productDesc,
        productImage: rows[0].productImage,
        productCat: rows[0].productCat,
        variants: [],
        reviews: [],
      };

      // eslint-disable-next-line no-undef
      const variantIds = new Set();
      // eslint-disable-next-line no-undef
      const reviewIds = new Set();

      rows.forEach((row) => {
        if (row.productVariantId && !variantIds.has(row.productVariantId)) {
          product.variants.push({
            productVariantId: row.productVariantId,
            productVariantProductId: row.productVariantProductId,
            productVariantName: row.productVariantName,
            productVariantPrice: row.productVariantPrice,
            productVariantStock: row.productVariantStock,
          });
          variantIds.add(row.productVariantId);
        }

        if (row.reviewsId && !reviewIds.has(row.reviewsId)) {
          product.reviews.push({
            reviewsId: row.reviewsId,
            productId: row.idProduct,
            comment: row.comment,
            rating: row.rating,
            name: row.name,
          });
          reviewIds.add(row.reviewsId);
        }
      });
      return product;
    }

    const products = rows.reduce((acc, row) => {
      const {
        productId,
        productName,
        productDesc,
        productImage,
        productCat,
        productVariantId,
        productVariantProductId,
        productVariantName,
        productVariantPrice,
        productVariantStock,
        reviewsId,
        idProduct,
        comment,
        rating,
        name,
      } = row;

      if (!acc[productId]) {
        acc[productId] = {
          productId,
          productName,
          productDesc,
          productImage,
          productCat,
          variants: [],
          reviews: [],
        };
      }

      if (
        productVariantId &&
        !acc[productId].variants.some(
          (variant) => variant.productVariantId === productVariantId
        )
      ) {
        acc[productId].variants.push({
          productVariantId,
          productVariantProductId,
          productVariantName,
          productVariantPrice,
          productVariantStock,
        });
      }

      if (
        reviewsId &&
        !acc[productId].reviews.some((review) => review.reviewsId === reviewsId)
      ) {
        acc[productId].reviews.push({
          reviewsId,
          idProduct,
          comment,
          rating,
          name,
        });
      }

      return acc;
    }, {});

    Object.values(products).forEach((product) => {
      product.variants.sort((a, b) => a.productVariantId - b.productVariantId);
    });

    let sortedProducts = Object.values(products);

    sortedProducts.sort((a, b) => a.productName.localeCompare(b.productName));

    if (sort === "priceAsc") {
      sortedProducts.sort((a, b) => {
        const priceA =
          a.variants.length > 0
            ? parseFloat(a.variants[0].productVariantPrice)
            : Infinity;
        const priceB =
          b.variants.length > 0
            ? parseFloat(b.variants[0].productVariantPrice)
            : Infinity;
        return priceA - priceB;
      });
    } else if (sort === "priceDesc") {
      sortedProducts.sort((a, b) => {
        const priceA =
          a.variants.length > 0
            ? parseFloat(a.variants[0].productVariantPrice)
            : -Infinity;
        const priceB =
          b.variants.length > 0
            ? parseFloat(b.variants[0].productVariantPrice)
            : -Infinity;
        return priceB - priceA;
      });
    } else if (sort === "nameDesc") {
      sortedProducts.sort((a, b) => b.productName.localeCompare(a.productName));
    }

    return Object.values(sortedProducts);
  } catch (err) {
    console.error("Error fetching users:", err);
    throw new Error("Error fetching users");
  } finally {
    if (connection) {
      connection.end();
    }
  }
}
