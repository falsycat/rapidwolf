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
      e.querySelector(".date").innerText = ((d) => {
        return `${d.getFullYear()}/${d.getMonth()}/${d.getDate()}`;
      })(item.date);
      elms.result.list.appendChild(e);
      e = elms.result.list.lastChild;
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
  });
});