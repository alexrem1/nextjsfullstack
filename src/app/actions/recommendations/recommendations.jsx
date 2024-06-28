"use server";

import { db } from "@/lib/db";

export async function recommendations() {
  let connection;

  const qRecommendations = `
    SELECT 
      DISTINCT o.id AS orderId,
      o.date AS orderDate,
      r.id AS recsId,
      r.orderId AS recsOrderId,
      r.productsRec,
      p.productId,
      p.productName,
      p.productDesc,
      p.productImage,
      p.productCat,
      v.productVariantId,
      v.productVariantName,
      v.productVariantPrice,
      v.productVariantStock,
      v.productOriginalPrice,
      rv.reviewsId,
      rv.comment,
      rv.rating,
      rv.name,
      rv.date AS reviewDate
    FROM 
      recommendations r
    INNER JOIN 
      orders o ON r.orderId = o.id
    LEFT JOIN 
      products p ON r.productsRec = p.productName
    LEFT JOIN 
      productVariant v ON p.productId = v.productVariantProductId
    LEFT JOIN 
      reviews rv ON p.productId = rv.idProduct
    ORDER BY 
      o.id DESC
  `;

  try {
    connection = await db.getConnection();
    const [recommendations] = await connection.query(qRecommendations);

    const allProducts = [];

    recommendations.forEach((row) => {
      const {
        productId,
        productName,
        productDesc,
        productImage,
        productCat,
        productVariantId,
        productVariantName,
        productVariantPrice,
        productVariantStock,
        productOriginalPrice,
        reviewsId,
        comment,
        rating,
        name,
        date,
      } = row;

      // Check if the product already exists in allProducts
      let existingProduct = allProducts.find(
        (product) => product.productId === productId
      );

      // If not, create a new product entry
      if (!existingProduct && productId) {
        existingProduct = {
          productId,
          productName,
          productDesc,
          productImage,
          productCat,
          variants: [],
          reviews: [],
        };
        allProducts.push(existingProduct);
      }

      // Add variant information if available and not already in the variants array
      if (
        productVariantId &&
        existingProduct.variants.every(
          (v) => v.productVariantId !== productVariantId
        )
      ) {
        existingProduct.variants.push({
          productVariantId,
          productVariantName,
          productVariantPrice,
          productVariantStock,
          productOriginalPrice,
        });
      }

      // Add review information if available and not already in the reviews array
      if (
        reviewsId &&
        existingProduct.reviews.every((r) => r.reviewsId !== reviewsId)
      ) {
        existingProduct.reviews.push({
          reviewsId,
          comment,
          rating,
          name,
          date,
        });
      }
    });

    return allProducts;
  } catch (err) {
    console.error("Error fetching recommendations:", err);
    return { error: "Error fetching recommendations" };
  } finally {
    if (connection) {
      connection.end();
    }
  }
}
