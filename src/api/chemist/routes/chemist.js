"use strict";

/**
 * chemist router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

const defaultRouter = createCoreRouter("api::chemist.chemist");

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
    path: "/chemists/unpublish/:userId",
    handler: "chemist.updateUnpublished",
  },
];

module.exports = customRouter(defaultRouter, myExtraRoutes);
