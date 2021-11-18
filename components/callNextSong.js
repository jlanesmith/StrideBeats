import React, { Component } from 'react';


export function callNextSong(nextSongBPM, playlist) {
    var nextSong = [];

    const BPMlist = Array.from(Array(playlist.songs.length).keys());
    for (var i = 0 ; i < playlist.songs.length ; i++ ){
    BPMlist[i] = playlist.songs[i].BPM;
    }

    var BPMdifftemp = BPMlist.map((x => x - nextSongBPM));

    var BPMdiff = BPMdifftemp;
    for (var i = 0; i < BPMdifftemp.length ; i++){
        BPMdiff[i] = Math.abs(BPMdifftemp[i]);
    }

    var diffMin = Math.min(...BPMdiff);
    var indmin = [];

    // find the indeces of minimum elements
    var idx = BPMdiff.indexOf(diffMin);

    while (idx != -1) {
    indmin.push(idx);
    idx = BPMdiff.indexOf(diffMin, idx + 1);
    }

    // find the number of minimum elements
    var minCount = 0;
    for (var i = 0; i < BPMdifftemp.length; i++){
        if(BPMdiff[i] == diffMin){
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