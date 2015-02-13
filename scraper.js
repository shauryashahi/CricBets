var page = require('webpage').create();
page.open('http://www.oddsportal.com/cricket/world/icc-world-cup-2011/results/', function(status) {
  if (status !== 'success') {
    console.log('Unable to access network');
  } 
  else{
    var scrape = page.evaluate(function() {
      var table = document.getElementById('tournamentTable'),
          listofmatches = table.querySelectorAll('tr.deactivate'),data=[],i,j;
        for(i=0;i< listofmatches.length;i++){
          var match = listofmatches[i],
            rows = match.querySelectorAll('td');
            for(j=0;j<rows.length;j++){
              if (!rows[1].querySelector('span')){
                continue;
              }
              else{
                winner = rows[1].querySelector('span').textContent;
                teams = rows[1].textContent.split('-');
                team1 = teams[0];
                team2 = teams[1];
                OddsTeam1 = rows[3].textContent;
                OddsTeam2 = rows[4].textContent;
              }
            }
            data.push({"Winner":winner,"Team1":team1,"Team2":team2,"OddsTeam1":OddsTeam1,"OddsTeam2":OddsTeam2});
        }
      return data
    });
    console.log(scrape[0].Winner + " " + scrape[0].Team1 + " " + scrape[0].Team2 + " " + scrape[0].OddsTeam1 + " " + scrape[0].OddsTeam2);
    console.log(scrape[1].Winner + " " + scrape[1].Team1 + " " + scrape[1].Team2 + " " + scrape[1].OddsTeam1 + " " + scrape[1].OddsTeam2);
  }
  phantom.exit();
});
