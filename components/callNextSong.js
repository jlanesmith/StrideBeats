import React, { Component } from 'react';


export function callNextSong({nextSongBPM, playlist, songState,currentPace}) {
    var nextSong = [];
    const BPMlist = Array.from(Array(playlist.props.children.length).keys());
    for (var i = 0 ; i < playlist.props.children.length ; i++ ){
    BPMlist[i] = playlist.props.children[i].BPM;
    }
    console.log(BPMlist)
    if (songState.speed_increase || songState.speed_decrease){
        console.log(songState.speed_increase)
        console.log(songState.speed_decrease)
        // If song BPM was manually changed, do nothing
    } else {
        nextSongBPM = currentPace;
    }
    
    var BPMdifftemp = BPMlist.map((x => x - nextSongBPM));
    var BPMdiff = BPMdifftemp;
    for (var i = 0; i < BPMdifftemp.length ; i++){
        BPMdiff[i] = Math.abs(BPMdifftemp[i]);
    }
    console.log(nextSongBPM)
    console.log(BPMdiff)

    var diffMin = Math.min(...BPMdiff);
    console.log(diffMin)
    var indmin = BPMdiff.find(function (element) {
        return element ===  diffMin;
      });
    console.log(indmin)
    if (indmin.length == 1) {
        console.log(playlist.props.children[indmin])
        return (nextSong = playlist.props.children[indmin]);
    } else {
        var indrand = indmin[Math.floor(Math.random() * indmin.length)];
        return (nextSong = playlist.props.children[indrand])
    }

}