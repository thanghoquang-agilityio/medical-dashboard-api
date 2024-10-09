"use strict";

/**
 * chemist controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::chemist.chemist", ({ strapi }) => ({
  async updateUnpublished(ctx) {
    const { userId } = ctx.params;

    try {
      const entries = await strapi.db.query("api::chemist.chemist").findMany({
        where: {
          users_permissions_user: { id: userId },
        },
      });

      if (entries.length === 0) {
        return ctx.send(
          { message: `No chemists found for user ID ${userId}.` },
          404
        );
      }

      const updatePromises = entries.map((entry) =>
        strapi.db.query("api::chemist.chemist").update({
          where: { id: entry.id },
          data: { publishedAt: null },
        })
      );

      await Promise.all(updatePromises);

      ctx.send({
        message: `Updated unpublished for user ID: ${userId}.`,
      });
    } catch (error) {
      ctx.send({ error: "An error occurred while updating entries." }, 500);
    }
  },
}));
