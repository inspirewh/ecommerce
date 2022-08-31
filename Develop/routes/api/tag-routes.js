const router = require('express').Router();
const { handleError500 } = require("../../utils/error-handler");
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagList = await Tag.findAll({
    include: [{model: Product, as: "product_tags"}]
  })
  res.json(tagList);
  } catch (err) {
    handleError500(res)(err);
    console.log(err)
  }
});


router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
