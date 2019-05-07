class MessageModel {
  constructor(data, message) {
    if (typeof data === 'string') {
      this.message = data;
      data = null;
      message = null;
    }
    if (data) {
      this.data = data;
    }
    if (message) {
      this.message = message;
    }
  }
}

class SuccessModel extends MessageModel {
  constructor(data, message) {
    super(data, message);
    this.code = '000000';
  }
}

class ErrorModel extends MessageModel {
  constructor(data, message) {
    super(data, message);
    this.code = '111111';
  }
}

module.exports = {
  SuccessModel,
  ErrorModel,
};
