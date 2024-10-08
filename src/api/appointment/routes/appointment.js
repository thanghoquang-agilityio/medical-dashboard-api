"use strict";

/**
 * appointment router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

const defaultRouter = createCoreRouter("api::appointment.appointment");

const customRouter = (innerRouter, extraRoutes = []) => {
  let routes;
  return {
    get prefix() {
      return innerRouter.prefix;
    },
    get routes() {
      if (!routes) routes = innerRouter.routes.concat(extraRoutes);
      return routes;
    },
  };
};

const myExtraRoutes = [
  {
    method: "PUT",
    path: "/appointments/unpublish/:userId",
    handler: "appointment.updateUnpublished",
  },
];

module.exports = customRouter(defaultRouter, myExtraRoutes);
