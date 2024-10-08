"use strict";

/**
 * notification router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

const defaultRouter = createCoreRouter("api::notification.notification");

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
    path: "/notifications/unpublish/:userId",
    handler: "notification.updateUnpublished",
  },
];

module.exports = customRouter(defaultRouter, myExtraRoutes);
