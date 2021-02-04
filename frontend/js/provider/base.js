export default class BaseProvider {
  constructor(name, icon) {
    this.name = name;
    this.icon = icon;
  
    this.downed = false;
  }
  fetch(keyword, callback) {
    throw new TypeError("Not Implemented");
  }
  abortFetching() {
    throw new TypeError("Not Implemented");
  }
  createItem({title, url, thumb, date}) {
    return {
      provider: this,
      title: title,
      url: url,
      thumb: thumb,
      date: date,
    };
  }
};