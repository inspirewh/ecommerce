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


router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  try {
    // be sure to include its associated Product data
    const tagId = await Tag.findByPk(req.params.id, {
      include:[{model: Product, as: 'product_tags'}]
    })
    if (tagId === null){
      res.json({
        error: "There are no tags with the ID you entered, please try again"
      })
    } else {
      res.json(tagId);
    }
  } catch (err) {
    handleError500(res)(err);
    console.log(err)
  }
});


router.post('/', async(req, res) => {
  // create a new tag
  try{
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.json(newTag);
  } catch (err) {
    handleError500(res)(err);
    console.log(err);
  }
});


router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const updateTag = await Tag.update(
      {
      tag_name: req.body.tag_name,
    }, 
    {
      where: {
        id: req.params.id},
      }
    );

    const updatedCategory = await Tag.findByPk(req.params.id);
    res.json(updatedCategory);
   }catch(err){
    handleError500(res)(err);
    console.log(err)
  }
});


router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const deletedTag = await Tag.destroy({ 
      where: { 
        id: req.params.id,
      } 
    })
    res.json(deletedTag);
  }catch(err){
    handleError500(res)(err);
    console.log(err)
  }
});


module.exports = router;
