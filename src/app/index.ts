/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-10 23:33:31
 * @LastEditTime: 2021-05-03 22:07:09
 * @LastEditors: mTm
 */
import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as cors from "@koa/cors"
import * as errorHandler from "./error-handler";

import useRoutes from "../router";
const app = new Koa();

app.use(cors());
app.use(bodyParser());

useRoutes(app);

app.on("error", errorHandler as any);

module.exports = app;
