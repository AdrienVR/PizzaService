package org.smartjava;

import org.vertx.java.core.Handler;
import org.vertx.java.core.eventbus.Message;
import org.vertx.java.core.http.HttpServerRequest;
import org.vertx.java.core.json.JsonArray;
import org.vertx.java.core.json.JsonObject;

public class ReplyHandlerLogin implements Handler<Message<JsonObject>> {

    private final HttpServerRequest request;
    public JsonObject data;

    public ReplyHandlerLogin(final HttpServerRequest request, JsonObject data) {
        this.request = request;
        this.data = data;
    }

    @Override
    public void handle(Message<JsonObject> event) {
        // if the response contains more message, we need to get the rest
        if (event.body().getString("status").equals("more-exist")) {
            JsonArray results = event.body().getArray("results");

            for (Object el : results) {
                data.getArray("results").add(el);
            }

            event.reply(new JsonObject(), new ReplyHandler(request, data));
        } else {

            JsonArray results = event.body().getArray("results");
            for (Object el : results) {
                data.getArray("results").add(el);
            }
            JsonArray res=data.getArray("results");
            if(res.size()==1)
            {
                JsonObject res2=res.get(0);
                String nom=res2.getString("pwd");
                if(nom.equals(request.params().get("pwd")))
                    request.response().end("login successfull");
                else
                    request.response().end("login failed : bad password");
            }
            else
                request.response().end("login failed : bad id");
        }
    }
}