class GetBookList {
  constructor(public url: string, public config: Object) {}

  public getBooks(params?: Object): void {
    let config: Object;
    params ? (config = params) : (config = this.config);
    const url = this.generateRequestURL(this.url, config);
    fetch(url)
      .then(this.responseHandler)
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }

  // This method takes any parameters and merges them properly into the base URL to build the final URL string for the request.
  private generateRequestURL(url: string, params: Object): string {
    url.endsWith("/") ? (url += "?") : (url += "/?");
    Object.keys(params).forEach((param, i) => {
      i === 0 ? (url += `${param}=${encodeURI(params[param])}`) : (url += `&${param}=${encodeURI(params[param])}`);
    });
    return url;
  }

  private responseHandler(response: Response): Promise<any> {
    const contentType = response.headers.get("content-type");
    if (contentType.includes("application/json")) {
      return this.JSONResponseHandler(response);
    } else if (contentType.includes("text/html")) {
      return this.textResponseHandler(response);
    } else {
      throw new Error(`Content-type '${contentType}' is not supported.`);
    }
  }

  private JSONResponseHandler(response: Response): Promise<any> {
    return response.json().then(json => {
      if (response.ok) {
        return json;
      } else {
        return Promise.reject(
          Object.assign({}, json, {
            status: response.status,
            statusText: response.statusText
          })
        );
      }
    });
  }

  private textResponseHandler(response: Response): Promise<any> {
    return response.text().then(text => {
      if (response.ok) {
        return new DOMParser().parseFromString(text, "application/xml");
      } else {
        throw new Error(
          `
          Response error!
          Status: ${response.status}
          StatusText: ${response.statusText}
          `
        );
      }
    });
  }
}
