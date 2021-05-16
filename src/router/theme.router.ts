/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-05-16 21:45:35
 * @LastEditTime: 2021-05-16 21:56:03
 * @LastEditors: mTm
 */
import * as Router from "koa-router";

import { verifyAuth } from "../middleware/auth.middleware";
import themeController from "../controller/them.copntroller";

const themeRouter = new Router({ prefix: "/theme" });

themeRouter.get("/", verifyAuth, themeController.detail);
themeRouter.patch("/", verifyAuth, themeController.update);

export default themeRouter;
