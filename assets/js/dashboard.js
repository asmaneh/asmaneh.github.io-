if (currentUser === undefined || currentUser === null) {
  window.location.replace('/');
}
var recentPost = getRecentPost(currentUser.username);
function showRecentPost(object) {
  if (object.entries.length>0) {
    $('#alertRecentPost').hide();
    $('#myRecentPostTable').show();
    for (var i = 0; i < object.entries.length; i++) {
      var isPostDate = new Date(object.entries[i]._created*1000);
      var isModifiedDate = new Date(object.entries[i]._modified*1000);
      var isStatus = '';
      if (object.entries[i].published == true) {
        isEdit ='display:none;';
        isDownload ='d-inline-block';
        isStatus = 'منتشر شده';
      } else {
        isEdit = '';
        isDownload ='d-none';
        isStatus = 'پیش‌‌نویس';
      }

        $('#myRecentPostList').prepend('<tr><th scope="row" >'+object.entries[i].title+'</th><td>'+isPostDate.toLocaleDateString('fa-IR')+'</td><td>'+ isModifiedDate.toLocaleDateString('fa-IR')+'</td><td>'+ isStatus +'</td><td><a href="/post/?id='+object.entries[i]._id+'" target="_blank" class="btn btn-primary btn-sm rounded-0 d-inline-block admin reviewer" id="showPrvPost" style="'+isEdit+'">ویرایش</a><a href="javascript:void(0)" class="gitPublish btn btn-secondary btn-sm rounded-0 admin reviewer '+isDownload+'" style="">دانلود</a><span style="display:none;">'+JSON.stringify(object.entries[i])+'</span></td></tr>');

    }
    checkCookie();
  }

}
function saveFile(id) {
  fetch(API_URL+'/api/collections/get/posts', {
      method: 'post',
      headers: { 'Content-Type': 'application/json','Authorization': 'Bearer '+TOKEN },
      body: JSON.stringify({
          filter: {_id: id}
      })
    })
      .then(res=>res.json())
      .then(data => obj = data)
      .then(res => downloadPost(obj.entries[0]));
}
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

$.getJSON('/search.json', function(data) {
  $.each(data, function(i, item){
    if(item.author === currentUser.username){
      $('#alertPublishedPosts').hide();
      $('#myPublishedPostsTable').show();
      $('#myPublishedPostsList').prepend('<tr><td><a href="'+item.url+'">'+item.title+'</a></td><td class="persianDate">'+item.date+'</td></tr>')
    }
  });
});
