
export function callNextSong(nextSongBPM, playlist) {
    var nextSong = [];
    var bpmbuffer = 5;

    const BPMlist = Array.from(Array(playlist.songs.length).keys());
    for (var i = 0 ; i < playlist.songs.length ; i++ ){
    BPMlist[i] = playlist.songs[i].BPM;
    }

    var BPMdifftemp = BPMlist.map((x => x - nextSongBPM));

    var BPMdiff = BPMdifftemp;
    for (var i = 0; i < BPMdifftemp.length ; i++){
        BPMdiff[i] = Math.abs(BPMdifftemp[i]);
    }

    var BPMbool = BPMdiff;
    for (var i = 0; i < BPMdifftemp.length ; i++){
        if (BPMdiff[i] <= bpmbuffer) {
            BPMbool[i] = 1;
        }else{
            BPMbool[i] = 0;
        }
    }
    var diffMin = Math.max(...BPMbool);
    var indmin = [];

    // find the indeces of minimum elements
    var idx = BPMbool.indexOf(diffMin);

    while (idx != -1) {
    indmin.push(idx);
    idx = BPMbool.indexOf(diffMin, idx + 1);
    }

    // find the number of minimum elements
    var minCount = 0;
    for (var i = 0; i < BPMdifftemp.length; i++){
        if(BPMbool[i] == diffMin){
            minCount = minCount+1;
        }
    }
    // output next song
    if (minCount == 1) {
        nextSong = playlist.songs[indmin]
        return (nextSong);
    } else {
        var indrand = indmin[Math.floor(Math.random() * minCount)];
        nextSong = playlist.songs[indrand]
        return (nextSong);
    }

}