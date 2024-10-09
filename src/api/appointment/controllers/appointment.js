"use strict";

/**
 * appointment controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::appointment.appointment",
  ({ strapi }) => ({
    async updateUnpublished(ctx) {
      const { userId } = ctx.params;

      try {
        const entriesSender = await strapi.db
          .query("api::appointment.appointment")
          .findMany({
            where: { senderId: userId },
          });

        const entriesReceiver = await strapi.db
          .query("api::appointment.appointment")
          .findMany({
            where: { receiverId: userId },
          });

        const entries = entriesSender.concat(entriesReceiver);

        if (entries.length === 0) {
          return ctx.send(
            { message: `No appointments found for user ID ${userId}.` },
            404
          );
        }

        const updatePromises = entries.map((entry) =>
          strapi.db.query("api::appointment.appointment").update({
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
  })
);
