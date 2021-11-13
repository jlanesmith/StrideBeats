import React, { Component } from 'react';


export function callNextSong({nextSongBPM, playlist}) {
    var nextSong = [];
    const BPMlist = Array.from(Array(playlist.props.children.length).keys());
    for (var i = 0 ; i < playlist.props.children.length ; i++ ){
    BPMlist[i] = playlist.props.children[i].BPM;
    }
    console.log('BPMlist')
    console.log(BPMlist)
    
    var BPMdifftemp = BPMlist.map((x => x - nextSongBPM));
    var BPMdiff = BPMdifftemp;
    for (var i = 0; i < BPMdifftemp.length ; i++){
        BPMdiff[i] = Math.abs(BPMdifftemp[i]);
    }
    console.log('nextSongBPM')
    console.log(nextSongBPM)

    var diffMin = Math.min(...BPMdiff);
    console.log('minimum difference')
    console.log(diffMin)
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

    
    console.log('indmin')
    console.log(indmin)
    console.log('minCount')
    console.log(minCount)
    if (minCount == 1) {
        console.log('Next Song')
        console.log(playlist.props.children[indmin])
        return (nextSong = playlist.props.children[indmin]);
    } else {
        var indrand = indmin[Math.floor(Math.random() * minCount)];
        console.log("random index value")
        console.log(indrand)
        console.log('Next Song')
        console.log(playlist.props.children[indrand])
        return (nextSong = playlist.props.children[indrand])
    }

}