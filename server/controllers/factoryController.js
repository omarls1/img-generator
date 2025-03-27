class handlerFactory {
  constructor(model) {
    this.Model = model;
  }

  returnResponse(res, statusCode, status, data) {
    return res.status(statusCode).json({
      status: status,
      data: data,
    });
  }

  async create(req, res) {
    const doc = await this.Model.createOne(req.body);
    return this.returnResponse(res, 201, "success", { doc });
  }

  async read(req, res) {
    const doc = await this.Model.findById(req.params.id);
    return this.returnResponse(res, 200, "success", { doc });
  }

  async update(req, res) {
    const doc = await this.Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    return this.returnResponse(res, 200, "success", { doc });
  }

  async delete(req, res) {
    await this.Model.findByIdAndDelete(req.params.id);
    return this.returnResponse(res, 204, "success", null);
  }
}
