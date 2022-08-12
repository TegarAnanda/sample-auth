/**
 * Return string representation of current date-time
 * @return {String}
 */
function getCurrentDate() {
  return new Date(Date.now());
}

/**
 * Return paginated response
 * @param {Number} itemCount : total item count
 * @param {Number} page : current page number
 * @param {Number} pageSize : number of items per page
 * @param {Object} data
 * @return {Object}
 */

const generatePaginatedResponse = ({itemCount, page=1, pageSize=100, data}) => {
  return {
    page_info: {
      item_count: itemCount,
      current_page: page,
      page_size: pageSize,
      page_count: itemCount > 0 ? Math.ceil(itemCount / pageSize) : 0,
      has_next_page: itemCount > pageSize * page ? true : false,
      has_previous_page: page > 1 && itemCount !== 0 ? true : false,
    },
    page_items: data,
  };
};

module.exports = {
  getCurrentDate,
  generatePaginatedResponse,
};
