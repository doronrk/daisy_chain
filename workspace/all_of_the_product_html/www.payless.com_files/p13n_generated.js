var rr_remote_data='eF4FwcENgCAMBdALJ2fxJ7S0UDZwDSwl8eBNnd_3Unr9aNHISgQ0RkDcTpDThC5lKyOv6Lbd33PNvbOChJpaFWOWDKnIP5PjEck';var rr_recs={placements:[]},rr_call_after_flush=function(){if (typeof RR.jsonCallback === "function"){     RR.jsonCallback(); }};rr_flush=function(){if(rr_onload_called){if(RR.defaultCallback){RR.defaultCallback(rr_recs);}else{rr_placements=[];var p=rr_recs.placements,h,i;for(i=0;i<p.length;i++){rr_placements[i]=[(p[i].used?1:0),p[i].placementType,p[i].html];}for(i=0;i<rr_placement_place_holders.length;i++){h=document.getElementById('rr_placement_'+i);if(h&&typeof h!='undefined'){rr_insert_placement(h,rr_placement_place_holders[i]);}}}rr_call_after_flush();}};rr_flush();