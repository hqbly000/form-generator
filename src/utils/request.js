import axios from "axios";

const axInst = axios.create({
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: sessionStorage.getItem("token")
  },
  transformRequest: [
    function(data) {
      // 对 data 进行任意转换处理
      var str = "";
      for (var key in data) {
        str +=
          encodeURIComponent(key).replace("[]", "") +
          "=" +
          encodeURIComponent(data[key]) +
          "&";
      }
      return str.slice(0, str.length - 1);
    }
  ]
});

// 添加响应拦截器
axInst.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    if (response.data.code && response.data.code == "403") {
      window.localtion.replace("/login.html");
    }
    return response.data;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

axInst.postJSON = function(...params) {
  return axInst.post(...params, {
    transformRequest: [
      function(data) {
        data = JSON.stringify(data);
        return data;
      }
    ],
    headers: { "Content-Type": "application/json" }
  });
};

/**
 * 上传文件
 * 上传文件到文件服务器 -- 单文件key为upload 多文件key为files 其余功能自定义
 * @param url
 * @param formData
 * @returns {*}
 */
 axInst.postFile = function(url, formData) {
  return axInst.post(url, formData, {
    //这里需要重写，直接返回formData，因为默认实例中改变了formData传输形式
    transformRequest: [
      function(data) {
        return data;
      }
    ],
    headers: { "Content-Type": "multipart/form-data" }
  });
};

export default axInst