//表单弹出
document.getElementById('add_btn').addEventListener('click', function() {
    document.getElementById('add_form').style.display = 'block'
})
//Json 
var jsonData = JSON.parse(localStorage.getItem('data'));
console.log(jsonData);

//展示条目
function showItem(k) {
    var jsonData = JSON.parse(localStorage.getItem('data'));
    var tbody = document.getElementById('tbody')
    var row = document.createElement('tr');
    var idCell = document.createElement('td');
    idCell.innerHTML = Number(k) + 1
    row.appendChild(idCell);
    var verseCell = document.createElement('td');
    verseCell.innerHTML = jsonData[k].verse;
    row.appendChild(verseCell);
    var dynastyCell = document.createElement('td');
    dynastyCell.innerHTML = jsonData[k].dynasty;
    row.appendChild(dynastyCell);
    var authorCell = document.createElement('td');
    authorCell.innerHTML = jsonData[k].author;
    row.appendChild(authorCell);
    var btn = document.createElement('td');
    var btn_mod = document.createElement('a')
    btn_mod.innerHTML = '修改'
    btn_mod.className = 'modify'
    btn.appendChild(btn_mod)
    var btn_del = document.createElement('a')
    btn_del.innerHTML = '删除'
    btn_del.className = 'delect'
    btn.appendChild(btn_del)
    row.appendChild(btn)
    tbody.appendChild(row)
}
//前端分页
//动态分页条
function showPage(psize) {
    var tbody = document.getElementById('tbody')
    var datanum = jsonData.length
    var totalPage = 1
    var pageSize = psize
    if (datanum / pageSize > parseInt(datanum / pageSize)) {
        totalPage = parseInt(datanum / pageSize) + 1;
    } else {
        totalPage = parseInt(datanum / pageSize)
    }
    if (totalPage == 1) {
        var pagination = document.getElementById('pagination')
        var item = document.createElement('a')
        item.className = 'active item'
        item.innerHTML = totalPage
        pagination.insertBefore(item, pagination.childNodes[2])
    } else {
        var pagination = document.getElementById('pagination')
        for (var i = 1; i < totalPage + 1; i++) {
            var pagination = document.getElementById('pagination')
            var item = document.createElement('a')
            item.className = 'item'
            item.innerHTML = i
            pagination.insertBefore(item, pagination.childNodes[i + 2])
        }
    }
}
//GoPage
function goPage(pnow, psize) {
    var btn_pagination = document.getElementsByClassName('item')
    btn_pagination[Number(pnow) + 4].className = 'active item'
    var tbody = document.getElementById('tbody')
    var datanum = jsonData.length
    var totalPage = 1
    var pageSize = psize
    if (datanum / pageSize > parseInt(datanum / pageSize)) {
        totalPage = parseInt(datanum / pageSize) + 1;
    } else {
        totalPage = parseInt(datanum / pageSize)
    }
    var currentPage = pnow
    if (currentPage != totalPage) {
        var startItem = (currentPage - 1) * pageSize
        var endItem = currentPage * pageSize;
        for (var k = startItem; k < endItem; k++) {
            showItem(k)
        }
    } else {
        var startItem = (currentPage - 1) * pageSize
        if (datanum % pageSize == 0) {
            var endItem = startItem + datanum % pageSize + 5
            for (var k = startItem; k < endItem; k++) {
                showItem(k)
            }
        } else {
            var endItem = startItem + datanum % pageSize
            for (var k = startItem; k < endItem; k++) {
                showItem(k)
            }
        }
    }
}
//检测
if (!jsonData) {
    alert('当前localstorage 已被清空,将自动添加')
    jsonData = [
        { "author": "闻天祥", "verse": "山河破碎风抛絮", "dynasty": "宋" },
        { "author": "闻天祥", "verse": "皇恐滩头说皇恐", "dynasty": "宋" }, 
        { "author": "闻天祥", "verse": "余囚北庭", "dynasty": "宋" }, 
        { "author": "闻天祥", "verse": "污下而幽暗", "dynasty": "宋" }, 
        { "author": "白居易", "verse": "汉皇重色思倾国", "dynasty": "唐" }, 
        { "author": "白居易", "verse": "御宇多年求不得", "dynasty": "唐" },
        { "author": "白居易", "verse": "养在深闺人未识", "dynasty": "唐" }]
    obj = JSON.stringify(jsonData);
    localStorage.setItem("data", obj);
    window.location.reload()
} else {
    // 初始化
    showPage(5)
    goPage(1, 5)
    modItem()
    delItem()
    PgUp()
    PgDn()
}
//跳页
var btn_pagination = document.getElementsByClassName('item')
for (var p = 5; p < btn_pagination.length - 2; p++) {
    btn_pagination[p].onclick = function() {
        document.getElementsByClassName('active item')[1].className = 'item'
        var pageno = this.innerHTML
        var tbody = document.getElementById('tbody').innerHTML = ''
        goPage(pageno, 5);
        modItem()
        delItem()
    }
}
//翻页
function PgUp() {
    var btn_pgup = document.getElementById('btn_pgup')
    btn_pgup.onclick = function() {
        var currentPg = document.getElementsByClassName('active item')[1].innerHTML
        document.getElementsByClassName('active item')[1].className = 'item'
        var tbody = document.getElementById('tbody').innerHTML = ''
        goPage(Number(currentPg) + 1, 5)
        modItem()
        delItem()
    }
}

function PgDn() {
    var btn_pgdn = document.getElementById('btn_pgdn')
    btn_pgdn.onclick = function() {
        var currentPg = document.getElementsByClassName('active item')[1].innerHTML
        document.getElementsByClassName('active item')[1].className = 'item'
        var tbody = document.getElementById('tbody').innerHTML = ''
        goPage(Number(currentPg) - 1, 5)
        modItem()
        delItem()
    }
}
//添加条目
function addItem(author_value, verse_value, dynasty_value) {
    jsonData.push({
        author: author_value,
        verse: verse_value,
        dynasty: dynasty_value
    })
    localStorage.setItem('data', JSON.stringify(jsonData));
}
//修改条目
function modItem() {
    var btn_modify = document.getElementsByClassName('modify')
    for (var i = 0; i < btn_modify.length; i++) {
        btn_modify[i].onclick = function() {
            var key = Number(this.parentNode.parentNode.childNodes[0].innerHTML) - 1
            document.getElementById('add_form').style.display = 'block'
            document.getElementsByClassName('header')[0].innerHTML = '修改诗词'
            document.getElementById('author').value = jsonData[key].author
            document.getElementById('verse').value = jsonData[key].verse
            document.getElementById('dynasty').value = jsonData[key].dynasty
        }
    }
}

function delItem() {
    var btn_delect = document.getElementsByClassName('delect')
    for (var i = 0; i < btn_delect.length; i++) {
        btn_delect[i].onclick = function() {
            var key = Number(this.parentNode.parentNode.childNodes[0].innerHTML) - 1
            var _arr = JSON.parse(localStorage.getItem('data'));
            _arr.splice(key, 1)
            localStorage.setItem("data", JSON.stringify(_arr));
            window.location.reload()
        }
    }
}
//表单验证
function checkform() {
    var author = document.getElementById('author')
    var author_value = author.value
    var reg1 = /^[\u4E00-\u9FA5]{2,10}$/;
    var verse = document.getElementById('verse')
    var verse_value = verse.value
    var reg2 = /^[\u4E00-\u9FA50-9]{2,20}$/
    var dynasty = document.getElementById('dynasty')
    var dynasty_value = dynasty.value
    var reg3 = /^[\u4E00-\u9FA5]$/
    if (author_value == '') {
        document.getElementById('author_field').className = 'field error'
        author.setAttribute("placeholder", "作者名字为空");
        document.getElementById('error_msg').style.display = 'block'
        document.getElementById('error_msg').innerHTML = '作者名字为空'
        event.preventDefault();
    } else if (!reg1.test(author_value)) {
        document.getElementById('author_field').className = 'field error'
        document.getElementById('error_msg').style.display = 'block'
        document.getElementById('error_msg').innerHTML = '作者名需为2-10个汉字'
        event.preventDefault();
    } else if (verse_value == '') {
        document.getElementById('verse_field').className = 'field error'
        verse.setAttribute("placeholder", "诗句为空");
        document.getElementById('error_msg').style.display = 'block'
        document.getElementById('error_msg').innerHTML = '诗句为空'
        event.preventDefault();
    } else if (!reg2.test(verse_value)) {
        document.getElementById('verse_field').className = 'field error'
        document.getElementById('error_msg').style.display = 'block'
        document.getElementById('error_msg').innerHTML = '诗词需为2-20个汉字或数字'
        event.preventDefault();
    } else if (dynasty_value == '') {
        document.getElementById('dynasty_field').className = 'field error'
        dynasty.setAttribute("placeholder", "朝代为空");
        document.getElementById('error_msg').style.display = 'block'
        document.getElementById('error_msg').innerHTML = '朝代为空'
        event.preventDefault();
    } else if (!reg3.test(dynasty_value)) {
        document.getElementById('dynasty_field').className = 'field error'
        document.getElementById('error_msg').style.display = 'block'
        document.getElementById('error_msg').innerHTML = '朝代需为汉字'
        event.preventDefault();
    } else {
        document.getElementById('add_form').style.display = 'none'
        addItem(author_value, verse_value, dynasty_value)
    }
}
document.getElementById('save').onclick = function() {
    checkform()
}