package org.smartjava;

import org.vertx.java.core.Handler;
import org.vertx.java.core.MultiMap;
import org.vertx.java.core.http.HttpServerRequest;
import org.vertx.java.core.http.RouteMatcher;
import org.vertx.java.core.json.JsonArray;
import org.vertx.java.core.json.JsonObject;
import org.vertx.java.platform.Verticle;
import java.util.Date;


public class PingVerticle extends Verticle
{

  public void start()
  {

    // deploy the mongo-persistor module
    JsonObject conf =new JsonObject().putString("address", "mongodb-persistor");
    conf.putString("host", "localhost");
    conf.putValue("port", 27017);
    conf.putValue("pool_size", 10);
    conf.putString("db_name", "test");
    container.deployModule("io.vertx~mod-mongo-persistor~2.1.0", conf);

    RouteMatcher matcher = new RouteMatcher();


    // the matcher for the complete list of pizzas
    matcher.get("/pizzas", new Handler<HttpServerRequest>() {
      public void handle(final HttpServerRequest req) {

          // create the query
        JsonObject json = new JsonObject().putString("collection", "pizzas")
                  .putString("action", "find")
                  .putObject("matcher", new JsonObject());

        JsonObject data = new JsonObject();
        data.putArray("results", new JsonArray());

        // and call the event we want to use
        vertx.eventBus().send("mongodb-persistor", json, new ReplyHandler(req, data));
      }
    });

    // the matcher for the complete list of orders
    matcher.get("/orders", new Handler<HttpServerRequest>() {
      public void handle(final HttpServerRequest req) {
        JsonObject match = new JsonObject()
                .putString("status", "en cours");
        // create the query
        JsonObject json = new JsonObject().putString("collection", "orders")
                .putString("action", "find")
                .putObject("matcher", new JsonObject());//match);

        JsonObject data = new JsonObject();
        data.putArray("results", new JsonArray());

        // and call the event we want to use
        vertx.eventBus().send("mongodb-persistor", json, new ReplyHandler(req, data));
      }
    });

    // the matcher for the complete list of orders
    matcher.get("/getBill", new Handler<HttpServerRequest>() {
      public void handle(final HttpServerRequest req) {

        MultiMap params = req.params();

        if (params.size() == 1 && params.contains("table")) {


          // create the query
          JsonObject match = new JsonObject()
                  .putNumber("table", Float.parseFloat(params.get("table")))
                  .putString("status", "preparee");
          JsonObject json = new JsonObject().putString("collection", "orders")
                  .putString("action", "find")
                  .putObject("matcher", match);

          JsonObject data = new JsonObject();
          data.putArray("results", new JsonArray());

          // and call the event we want to use
          vertx.eventBus().send("mongodb-persistor", json, new ReplyHandlerBill(req, data));
        } else
          req.response().end("get Bill failed : bad request");

      }
    });

    // the matcher for login
    // request example :
    // curl -X POST -d @filename "http://localhost:8888/login?id=jonathan&pwd=pennec"
    matcher.post("/login", new Handler<HttpServerRequest>() {
      public void handle(final HttpServerRequest req) {

        MultiMap params = req.params();

        // create the query
        if (params.size() == 2 && params.contains("id") && params.contains("pwd")) {
          JsonObject matcher = new JsonObject();
          matcher.putString("id", req.params().get("id"));
          JsonObject json = new JsonObject().putString("collection", "comptes")
                  .putString("action", "find")
                  .putObject("matcher", matcher);

          JsonObject data = new JsonObject();
          data.putArray("results", new JsonArray());
          ReplyHandlerLogin rep = new ReplyHandlerLogin(req, data);
          // and call the event we want to use
          vertx.eventBus().send("mongodb-persistor", json, rep);
        } else
          req.response().end("login failed : bad request");
      }
    });

    // the matcher for adding user account
    // request example :
    // curl -X POST -d @filename "http://localhost:8888/addingUser?id=jack&pwd=oneill"
    matcher.post("/addingUser", new Handler<HttpServerRequest>() {
      public void handle(final HttpServerRequest req) {

        MultiMap params = req.params();

        // create the query
        if (params.size() == 2 && params.contains("id") && params.contains("pwd"))
        {
          JsonObject doc =new JsonObject().putString("id", req.params().get("id"))
                .putString("pwd", req.params().get("pwd"));
          JsonObject json = new JsonObject().putString("collection", "comptes")
                  .putString("action", "save")
                  .putObject("document", doc);
          // and call the event we want to use
          vertx.eventBus().send("mongodb-persistor", json);
          req.response().end("adding user successfull");
        } else
          req.response().end("adding user failed : bad request");
      }
    });

    // the matcher for adding Order
    // request example :
    // curl -X POST -d @rien "http://localhost:8888/addingOrder?json=???"
    matcher.get("/addingOrder", new Handler<HttpServerRequest>() {
      public void handle(final HttpServerRequest req) {

        MultiMap params = req.params();

        // create the query
        if (params.size() == 1 && params.contains("json")) {
          String stringdoc = params.get("json");
          JsonObject doc = new JsonObject(stringdoc);
          Date date = new Date();
          String randomId = Long.toString(date.getTime());
          doc.putString("status", "en cours")
                  .putString("date", date.toString())
                  .putString("_id", randomId);
          JsonObject json = new JsonObject().putString("collection", "orders")
                  .putString("action", "save")
                  .putObject("document", doc);
          // and call the event we want to use
          vertx.eventBus().send("mongodb-persistor", json);
          req.response().end("adding order successfull");
        } else
          req.response().end("adding order failed : bad request");
      }
    });

// the matcher for changing Order Status
    matcher.get("/changingOrderStatus", new Handler<HttpServerRequest>() {
      public void handle(final HttpServerRequest req) {

        MultiMap params = req.params();

        // create the query
        if (params.size() == 2 && params.contains("id") && params.contains("status")) {
          JsonObject crit = new JsonObject().putString("_id", params.get("id"));
          JsonObject nObj = new JsonObject().putObject("$set", new JsonObject().putString("status", params.get("status")));
                  //.putString("details", params.get("status")));
          JsonObject json = new JsonObject().putString("collection", "orders")
                  .putString("action", "update")
                  .putObject("criteria", crit)
                  .putObject("objNew", nObj)//new JsonObject().putString("status",params.get("status"))
                  .putBoolean("upsert", false)
                  .putBoolean("multi", false);
          // and call the event we want to use
          vertx.eventBus().send("mongodb-persistor", json);
          req.response().end("changing order status successfull");
        } else
          req.response().end("changing order status failed : bad request");
      }
    });

    // create and run the server
    vertx.createHttpServer().requestHandler(matcher).listen(8001);

    // output that the server is started
    container.logger().info("Webserver started, listening on port: 8001");
  }

}
