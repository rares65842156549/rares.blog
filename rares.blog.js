Articole = new Mongo.Collection("articole");
Comentarii = new Mongo.Collection("comentarii");

if (Meteor.isClient) {
    // Session.setDefault('like_counter', 0);

    Template.articol.helpers({
        // like_counter: function () {
        //   return Session.get('like_counter');
        //}
        num_comm: function(article_id) {
              return Comentarii.find({art_id: article_id}).count();
        }
    });

    Template.articol.events({
        "click .remove": function() {
            Articole.remove(this._id);
        },
        "click .showcomm": function (event, template) {
          new_comment_form = template.find(".new-comment");
          if(new_comment_form.style.display == 'none') {
            new_comment_form.style.display = 'block';
          } else {
            new_comment_form.style.display = 'none';
          }
        }

        // "click .like": function() {
        //   Session.set('like_counter', Session.get('like_counter') + 1);
        // }
    });

    Template.formComentariu.helpers ({
        getComments: function (article_id) {
          return Comentarii.find({art_id: article_id}, {});
        }
    });

    Template.formComentariu.events ({
        "submit .new-comment": function(event) {
            var cTitlu = event.target.commTitle.value;
            var cContinut = event.target.commContent.value;

            if(event.target.commTitle.value !== "" && event.target.commContent.value !== "") {
                Comentarii.insert({
                    coTitlu: cTitlu,
                    coContinut: cContinut,
                    art_id: this._id
                });
            } else {
                alert("Titlul si continutul comentariului sunt goale!");
            }
        }
    });

    Template.comentariu.helpers ({
        
    });

    Template.body.helpers({
        articole: function () {
            return Articole.find({}, {sort: {createdAt: -1}});
        },
        nArticole: function () {
            return Articole.find({}).count();
        }
    });

    Template.body.events({
        "submit .new-article": function (event) {
            var titlu = event.target.title.value;
            var continut = event.target.content.value;
            var culoare = event.target.color.value;
            var data = new Date();
            var ore = data.getHours();
            var min = data.getMinutes();
            var day = data.getDay();
            switch(day) {
                case 0:
                    day = "Duminica";
                    break;

                case 1:
                    day = "Luni";
                    break;

                case 2:
                    day = "Marti";
                    break;

                case 3:
                    day = "Miercuri";
                    break;

                case 4:
                    day = "Joi";
                    break;

                case 5:
                    day = "Vineri";
                    break;

                case 6:
                    day = "Sambata";
                    break;


            }
            if(event.target.title.value !== "" && event.target.content.value !== "") {
                Articole.insert({
                    titlu: titlu,
                    continut: continut,
                    culoare: culoare,
                    timp: ore + ":" + min,
                    ziua: day,
                    createdAt: new Date,
                    owner: Meteor.userId(),
                    username: Meteor.user().username
                });
            } else {
                alert("Titlul si continutul articolului sunt goale!");
            }

            event.target.title.value = "";
            event.target.content.value = "";

            return false;
        },

        //    userRares: function() {
        //        if( currentUser.username === "rares") {
        //           
        //        }
        //         console.log("userul e corect");
        //
        //        return currentUser.username === "rares";
        //    }
    });

    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {

    });
}
