function handleError500(res){
    return (err => {
    //best practice -- report error to admin -- send email to admin
    console.log(err)
    res.status(500).json({
      error: 'We have encouratnered and error. Please try again soon'
    })
  });
}

module.exports = {handleError500}