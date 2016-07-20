var notes = [],
	$addNote       = $('.add-note'),
	addNoteForm    = $addNote.find('form'),
	$notes         = $('.notes'),
	notesContainer = $notes.find('.container'),
	notex		   = notesContainer.find('button'),
	note_title     = addNoteForm.find('input[name="note_title"]'),
	note_content   = addNoteForm.find('textarea[name="note_content"]');

function genID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
     var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
     return v.toString(16);
  });
}

function appendSingleNote(data) {
	var content = data.content, title = data.title,id=data.id; 

	var html = '<div class="note" id="'+id +'" >' +  '<button data-id="'+id +'">X</button>'+
                    '<p class="note-title">' + title + '</p>' +
                    '<p class="note-content">' + 
                        content +
                    '</p>' +
                '</div>';
    notesContainer.append(html);
}

//{title: 'adasd', content: 'asda'}
function storeNote(data) {

	notes.push(data);
	window.localStorage.setItem('notes', JSON.stringify(notes));

	appendSingleNote(data);
}


function init() {
	if(!!window.localStorage.getItem('notes')) {
		notes = JSON.parse(window.localStorage.getItem('notes'));
	} else {
		notes = [];
	}
	var i;
	for (i = 0; i < notes.length; i++) {
		appendSingleNote(notes[i]);
	}
}



addNoteForm.on('submit', function(e){
    e.preventDefault();

	var cur_id=genID();
	var data = {title: note_title.val(), content: note_content.val(), id :cur_id};
	console.log(cur_id);
	storeNote(data);
});

function deleteNote(id) {

	$('#' + id).remove();
	var i;
	
	for (i = 0; i < notes.length ; i++) {
		if(notes[i].id == id) {
			notes.splice(i, 1);
			break;
		}
	}
	
	window.localStorage.setItem('notes', JSON.stringify(notes));
	
}

notesContainer.on('click', 'button', function(){
	var button = $(this),
	    id = button.attr('data-id');
    deleteNote(id);

});


init();