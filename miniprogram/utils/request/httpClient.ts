// 请求方式
export enum HttpMethod {
    GET = "GET",
    HEAD = "HEAD",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    OPTIONS = "OPTIONS",
    TRACE = "TRACE",
    CONNECT = "CONNECT"
  }
   
  /// 请求入参
  class RequestMessage {
    Api:string;
    Param: any;
    Method: HttpMethod;
    Header: Object;
    constructor(api:string,param:any,method:HttpMethod = HttpMethod.GET,header:any = null){
      this.Api = api;
      this.Param = param;
      this.Method = method;
      this.Header = header;
    }
  }
   
  /**
   * HttpClient 实例
   */
  class HttpClient {
    private RequestInterceptor: Function | undefined;
    private ReponseInterceptor: Function | undefined;
    private baseUrl: string;
    constructor(baseUrl:string = ''){
      this.baseUrl = baseUrl;
    }
    
    /** 请求拦截器 */
    public UseRequestInterceptor(interceptor:(requestMessage: RequestMessage) => boolean): HttpClient {
      this.RequestInterceptor = interceptor;
      return this;
    }
   
    /** 响应拦截器 */
    public UseReponseInterceptor(interceptor:(reponseMessage:any) => any): HttpClient {
      this.ReponseInterceptor = interceptor;
      return this;
    }
   
    /**
     * 发起请求
     * @param requestMessage 请求体 
     */
    private Request(requestMessage:RequestMessage){ 
      var that = this;
      return new Promise((resolve,reject) => {
        if(that.RequestInterceptor && !that.RequestInterceptor(requestMessage))
          return reject("取消请求");
        wx.request({
          url: `${that.baseUrl}${requestMessage.Api}`,
          data:requestMessage.Param,
          method: requestMessage.Method,
          header:requestMessage.Header,
          success(res) {
            resolve && resolve(that.ReponseInterceptor && that.ReponseInterceptor(res));
          },
          fail(error){ 
            reject && reject(error);
           }
        });
      });
    }
   
    /**
     * Get 请求
     * @param api 接口
     * @param param 入参
     */
    public Get(api: string, param: any) {
      return this.Request(new RequestMessage(api,param));
    }
   
    /**
     * Head 请求
     * @param api 
     * @param param 
     * @returns 
     */
    public Head(api: string, param: any){
      return this.Request(new RequestMessage(api,param,HttpMethod.HEAD));
    }
   
    /**
     * Post 请求
     * @param api 接口 
     * @param param 入参
     */
    public Post(api: string, param: any){
      return this.Request(new RequestMessage(api,param,HttpMethod.POST));
    }
   
    /**
     * Connect 请求
     * @param api 
     * @param param 
     * @returns 
     */
    public Connect(api: string,param:any){
      return this.Request(new RequestMessage(api,param,HttpMethod.CONNECT));
    }
   
    /**
     * OPTIONS 请求
     * @param api 
     * @param param 
     * @returns 
     */
    public Options(api: string,param:any){
      return this.Request(new RequestMessage(api,param,HttpMethod.OPTIONS));
    }
   
    /**
     * Delete 请求
     * @param api 接口
     * @param param 入参
     */
    public Delete(api: string,param?: any){
      return this.Request(new RequestMessage(api,param,HttpMethod.DELETE));
    }
   
    /**
     * Put 请求
     * @param api 接口
     * @param param 入参
     */
    public Put(api: string, param: any){
      return this.Request(new RequestMessage(api,param,HttpMethod.PUT));
    }
  }
   
  /** HttpClient工厂 */
  export class HttpClientFactory{
    public static Create(baseUrl:string = ''): HttpClient{
      return new HttpClient(baseUrl);
    }
  }