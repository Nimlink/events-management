var app = angular.module('fup');

app.service('ownerNoteService', function (dbQueriesService, $q, ownerService) {

    this.owner = {};
    this.moyenne = {};
    this.notes = [];

    this.getOwner = function() {
        return owner;
    };

    this.getMoyenne = function() {
        return moyenne;
    };

    this.getNotes = function() {
        return notes;
    };

    this.refresh = function(callback) {
        ownerService.getOwner(function (err, result) {
            this.owner = result;
            this.notes = this.owner.notes;

            this.moyenne = {
                capacity: 0,
                attitude: 0,
                degradation: 0,
                general: 0
            };

            var nbCapacity = 0;
            var nbAttitude = 0;
            var nbDegradation = 0;
            for (var i in this.notes) {
                var nbNote = 0;
                var item = this.notes[i];
                this.notes[i].moyenne = 0;
                this.notes[i].buttonCapacity = '';
                this.notes[i].buttonAttitude = '';
                this.notes[i].buttonDegradation = '';
                this.notes[i].buttonMoyenne = '';
                if (item.capacity != null) {
                    this.moyenne.capacity += item.capacity;
                    nbCapacity += 1;
                    this.notes[i].moyenne += item.capacity;
                    nbNote += 1;

                    if (item.capacity < 2 ) {
                        this.notes[i].buttonCapacity = 'btn-danger';
                    } else {
                        if (item.capacity >= 2 && item.capacity < 4) {
                            this.notes[i].buttonCapacity = 'btn-warning';
                        } else {
                            this.notes[i].buttonCapacity = 'btn-primary';
                        }
                    }
                }
                if (item.attitude != null) {
                    this.moyenne.attitude += item.attitude;
                    nbAttitude += 1;
                    this.notes[i].moyenne += item.attitude;
                    nbNote += 1;

                    if (item.attitude < 2 ) {
                        this.notes[i].buttonAttitude = 'btn-danger';
                    } else {
                        if (item.attitude >= 2 && item.attitude < 4) {
                            this.notes[i].buttonAttitude = 'btn-warning';
                        } else {
                            this.notes[i].buttonAttitude = 'btn-primary';
                        }
                    }
                }
                if (item.degradation != null) {
                    this.moyenne.degradation += item.degradation;
                    nbDegradation += 1;
                    this.notes[i].moyenne += item.degradation;
                    nbNote += 1;

                    if (item.degradation < 2 ) {
                        this.notes[i].buttonDegradation = 'btn-danger';
                    } else {
                        if (item.degradation >= 2 && item.degradation < 4) {
                            this.notes[i].buttonDegradation = 'btn-warning';
                        } else {
                            this.notes[i].buttonDegradation = 'btn-primary';
                        }
                    }
                }
                this.notes[i].moyenne = Math.floor(this.notes[i].moyenne/nbNote/5*100);

                if (item.moyenne < 34 ) {
                    this.notes[i].buttonMoyenne = 'btn-danger';
                } else {
                    if (item.moyenne >= 34 && item.moyenne < 66) {
                        this.notes[i].buttonMoyenne = 'btn-warning';
                    } else {
                        this.notes[i].buttonMoyenne = 'btn-primary';
                    }
                }
            }

            this.moyenne.general = (this.moyenne.capacity + this.moyenne.attitude + this.moyenne.degradation) / (nbDegradation+nbAttitude+nbCapacity);
            this.moyenne.general = Math.floor(this.moyenne.general / 5 *100);

            if (nbCapacity == 0) {
                this.moyenne.capacity = null;
            } else {
                this.moyenne.capacity = Math.floor(this.moyenne.capacity / nbCapacity);
            }
            if (nbAttitude == 0) {
                this.moyenne.attitude = null;
            } else {
                this.moyenne.attitude = Math.floor(this.moyenne.attitude / nbAttitude);
            }
            if (nbDegradation == 0) {
                this.moyenne.degradation = null;
            } else {
                this.moyenne.degradation = Math.floor(this.moyenne.degradation / nbDegradation);
            }
            callback(null);
        });
    }

});
