"use strict";

import underscore from "underscore";

import RapidWolf from "./rapidwolf.js";

import "../style/main.scss";

window.addEventListener("DOMContentLoaded", () => {
  let elms = {
    header: document.querySelector("#header"),
    query: {
      form: document.querySelector("#search form"),
      input: document.querySelector("#search input"),
      msg: document.querySelector("#search .query-enter-msg"),
    },
    result: {
      list: document.querySelector("#result"),
      item: document.querySelector("#result template"),
    },
  };

  let queue = [];
  let last_item = elms.result.item;
  let rw = new RapidWolf({
    onFetch: (item) => {
      queue.push(item);
    },
  });

  setInterval(() => {
    const present = (item) => {
      if (!elms.header.classList.contains("minimized")) {
        elms.header.classList.add("minimized");
      }
      let e = document.importNode(elms.result.item.content, true);
      e.querySelector("img").src = item.thumb || "";
      e.querySelector("a").href = item.url;
      e.querySelector(".title").innerText = underscore.unescape(item.title);

      ((e) => {
        const d = item.date;
        if (d) {
          e.innerText = `${d.getFullYear()}/${d.getMonth()}/${d.getDate()}`;
        } else {
          e.classList.add("hidden");
        }
      })(e.querySelector(".date"));

      elms.result.list.insertBefore(e, last_item.nextSibling);
      e = last_item = last_item.nextSibling;
      
      setTimeout(() => {
        e.classList.add("shown");
      }, 100);
    };
    if (queue.length > 0) {
      const index = Math.floor(Math.random()*queue.length);
      const item = queue.splice(index, 1);
      present(item[0]);
    }
  }, 50);

  elms.query.input.addEventListener("input", () => {
    elms.query.msg.classList.add("shown");
    setTimeout(() => {
      elms.query.msg.classList.remove("shown")
    }, 1000);
  });

  let last_keyword = null;
  elms.query.form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (last_keyword !== elms.query.input.value) {
      elms.query.input.blur();
      rw.fetch(elms.query.input.value);
      last_item = elms.result.item;
      last_keyword = elms.query.input.value;
    }
  });

  elms.query.input.focus();
});