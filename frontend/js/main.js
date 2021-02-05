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
  let index = 0;
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
      e.querySelector("img").src = item.thumb;
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
      
      const list = elms.result.list;
      const next = index < list.children.length? list.children[index]: null;
      list.insertBefore(e, next);
      e = list.children[index++];

      setTimeout(() => {
        e.classList.add("shown");
      }, 100);
    };
    for (let i = 0; i < 5; ++i) {
      const item = queue.shift();
      if (item) present(item);
    }
  }, 500);

  elms.query.input.addEventListener("input", () => {
    elms.query.msg.classList.add("shown");
    setTimeout(() => {
      elms.query.msg.classList.remove("shown")
    }, 1000);
  });
  elms.query.form.addEventListener("submit", (e) => {
    e.preventDefault();
    rw.fetch(elms.query.input.value);
    index = 0;
  });
});