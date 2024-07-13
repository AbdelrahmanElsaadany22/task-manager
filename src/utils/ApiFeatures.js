export class ApiFeatures {
	constructor(query, reqQuery) {
		this.query = query
		this.reqQuery = reqQuery
	}

	paginate(pageSize = 5) {
		let page = +this.reqQuery?.page || 1
		if (page < 1) page = 1
		this.query = this.query.skip((page - 1) * pageSize).limit(pageSize)
		return this
	}
	filterByCategory() {
		if (!this.reqQuery.category) return this;
		this.query = this.query.find({ category: this.reqQuery.category });
		return this;
	}
    filterByVisibility(visibility) {
        if (!visibility) return this;
        this.query = this.query.find({ visibility });
        return this;
    }
}