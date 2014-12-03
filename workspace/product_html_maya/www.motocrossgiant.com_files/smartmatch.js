var contents=new Array();
function push(str){
        contents [contents.length] = str;
}
function TCN_addContent(str){
	push(str);
	arrayValues = new Array();
	for(i=0;i<contents.length;i++){
		arrayValues[i]=contents[i].split(separator);
	}
}
function TCN_makeSelValueGroup(){
	selValueGroup=new Array();
	args=TCN_makeSelValueGroup.arguments;
	for(i=0;i<args.length;i++){
		selValueGroup[i]=args[i];
	}
}
function TCN_makeComboGroup(){
	comboGroup=new Array();
	args=TCN_makeComboGroup.arguments;
	for(i=0;i<args.length;i++){
		comboGroup[i]=findObj(args[i]);
	}
}
function TCN_reload(from){
	thisComboStr="";
	var index=-1;
	if(!from){
		index=0;
		setDefault();
	}else{
		for(var j=0;j<comboGroup.length-1;j++){
			if (comboGroup[j]==from){
				index=j+1;
			}
		}
	}
	if(index!=-1){
		thisCombo=comboGroup[index];
		thisComboText=index*2;
		thisComboValue=(index*2)+1;
		if(index>0){
			for(var p=0;p<index;p++){	thisComboStr+=comboGroup[p].options[comboGroup[p].selectedIndex].text+separator+comboGroup[p].options[comboGroup[p].selectedIndex].value+separator;
			}
		}
		for(var m=thisCombo.options.length-1;m>=1;m--){
			thisCombo.options[m]=null;
		}
		for(var i=0;i<contents.length;i++){
			existe=false;
			if(contents[i].substr(0,thisComboStr.length)==thisComboStr){
				for(var j=0;j<thisCombo.options.length;j++){
					if(arrayValues[i][thisComboText]==thisCombo.options[j].innerHTML){
						existe=true;
					}
				}
				if(existe==false){
					var newIndex = thisCombo.options.length;
					thisCombo.options[newIndex]=new Option();
					thisCombo.options[newIndex].innerHTML = arrayValues[i][thisComboText];
					thisCombo.options[newIndex].value = arrayValues[i][thisComboValue];
				}
			}
		}
		thisCombo.options[0].selected=true;
		for (var n=0;n<thisCombo.options.length;n++){
			if(thisCombo.options[n].value==selValueGroup[index]){
				thisCombo.options[n].selected=true;
			}
		} 
		TCN_reload(thisCombo);
	}
}
function setDefault(){
	for (i=selValueGroup.length-1;i>=0;i--){
		if(selValueGroup[i]!=""){
			for(j=0;j<contents.length;j++){
				if(arrayValues[j][(i*2)+1]==selValueGroup[i]){
					for(k=i;k>=0;k--){
						if(selValueGroup[k]==""){
							selValueGroup[k]=arrayValues[j][(k*2)+1];
						}
					}
				}
			}
		}
	}
}
function findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}
