// ============================================================
//  FOOT DUEL — bases de données des jeux de connaissance
//  À relire et corriger librement : chaque ligne est indépendante.
//
//  CARRIÈRES  : Nom|Pays|Poste|Année de naissance|Club 1;Club 2;…|alias 1;alias 2 (facultatif)
//               (clubs seniors dans l'ordre, prêts courts omis)
//  LE 11      : titre, équipe, adversaire, score, date, puis les 11 titulaires
//  TOP LISTES : titre, date de référence, puis les éléments (nom|détail)
// ============================================================
const CAREERS_RAW=`
Zinédine Zidane|FRA|MIL|1972|Cannes;Bordeaux;Juventus;Real Madrid|Zidane;Zizou
Thierry Henry|FRA|ATT|1977|Monaco;Juventus;Arsenal;FC Barcelone;New York Red Bulls
Lilian Thuram|FRA|DEF|1972|Monaco;Parme;Juventus;FC Barcelone
Patrick Vieira|FRA|MIL|1976|Cannes;AC Milan;Arsenal;Juventus;Inter Milan;Manchester City
Marcel Desailly|FRA|DEF|1968|Nantes;Marseille;AC Milan;Chelsea;Al-Gharafa;Qatar SC
Didier Deschamps|FRA|MIL|1968|Nantes;Marseille;Bordeaux;Marseille;Juventus;Chelsea;Valence
Laurent Blanc|FRA|DEF|1965|Montpellier;Napoli;Nîmes;Saint-Étienne;Auxerre;FC Barcelone;Marseille;Inter Milan;Manchester United
Fabien Barthez|FRA|GB|1971|Toulouse;Marseille;Monaco;Manchester United;Marseille;Nantes
David Trezeguet|FRA|ATT|1977|Platense;Monaco;Juventus;Hércules;Baniyas;River Plate;Newell's Old Boys;Pune City
Robert Pirès|FRA|MIL|1973|Metz;Marseille;Arsenal;Villarreal;Aston Villa;FC Goa
Claude Makélélé|FRA|MIL|1973|Nantes;Marseille;Celta Vigo;Real Madrid;Chelsea;Paris SG
Franck Ribéry|FRA|AIL|1983|Brest;Metz;Galatasaray;Marseille;Bayern Munich;Fiorentina;Salernitana
Karim Benzema|FRA|ATT|1987|Lyon;Real Madrid;Al-Ittihad
Hugo Lloris|FRA|GB|1986|Nice;Lyon;Tottenham;Los Angeles FC
Olivier Giroud|FRA|ATT|1986|Grenoble;Istres;Tours;Montpellier;Arsenal;Chelsea;AC Milan;Los Angeles FC;Lille
Blaise Matuidi|FRA|MIL|1987|Troyes;Saint-Étienne;Paris SG;Juventus;Inter Miami
Paul Pogba|FRA|MIL|1993|Manchester United;Juventus;Manchester United;Juventus;Monaco
Antoine Griezmann|FRA|ATT|1991|Real Sociedad;Atlético Madrid;FC Barcelone;Atlético Madrid
Kylian Mbappé|FRA|ATT|1998|Monaco;Paris SG;Real Madrid
N'Golo Kanté|FRA|MIL|1991|Boulogne;Caen;Leicester;Chelsea;Al-Ittihad|Kante
Raphaël Varane|FRA|DEF|1993|Lens;Real Madrid;Manchester United;Côme
Samuel Umtiti|FRA|DEF|1993|Lyon;FC Barcelone;Lecce;Lille
Ousmane Dembélé|FRA|AIL|1997|Rennes;Borussia Dortmund;FC Barcelone;Paris SG
Kingsley Coman|FRA|AIL|1996|Paris SG;Juventus;Bayern Munich;Al-Nassr
Adrien Rabiot|FRA|MIL|1995|Paris SG;Juventus;Marseille;AC Milan
Eric Cantona|FRA|ATT|1966|Auxerre;Marseille;Bordeaux;Montpellier;Marseille;Nîmes;Leeds;Manchester United
Jean-Pierre Papin|FRA|ATT|1963|Valenciennes;Club Bruges;Marseille;AC Milan;Bayern Munich;Bordeaux;Guingamp
Michel Platini|FRA|MIL|1955|Nancy;Saint-Étienne;Juventus
Youri Djorkaeff|FRA|ATT|1968|Grenoble;Strasbourg;Monaco;Paris SG;Inter Milan;Kaiserslautern;Bolton;Blackburn;New York Red Bulls
Bixente Lizarazu|FRA|DEF|1969|Bordeaux;Athletic Bilbao;Bayern Munich;Marseille;Bayern Munich
Christophe Dugarry|FRA|ATT|1972|Bordeaux;AC Milan;FC Barcelone;Marseille;Bordeaux;Birmingham;Qatar SC
Emmanuel Petit|FRA|MIL|1970|Monaco;Arsenal;FC Barcelone;Chelsea
Nicolas Anelka|FRA|ATT|1979|Paris SG;Arsenal;Real Madrid;Paris SG;Liverpool;Manchester City;Fenerbahçe;Bolton;Chelsea;Shanghai Shenhua;Juventus;West Bromwich;Mumbai City
Hatem Ben Arfa|FRA|AIL|1987|Lyon;Marseille;Newcastle;Hull City;Nice;Paris SG;Rennes;Valladolid;Bordeaux;Lille
Samir Nasri|FRA|MIL|1987|Marseille;Arsenal;Manchester City;Séville FC;Antalyaspor;West Ham;Anderlecht
Florent Malouda|FRA|AIL|1980|Châteauroux;Guingamp;Lyon;Chelsea;Trabzonspor;Metz
Sylvain Wiltord|FRA|ATT|1974|Rennes;Deportivo La Corogne;Bordeaux;Arsenal;Lyon;Rennes;Marseille;Metz;Nantes
Ludovic Giuly|FRA|AIL|1976|Lyon;Monaco;FC Barcelone;AS Roma;Paris SG;Monaco;Lorient
Djibril Cissé|FRA|ATT|1981|Auxerre;Liverpool;Marseille;Sunderland;Panathinaïkos;Lazio;Queens Park Rangers;Bastia
Patrice Evra|FRA|DEF|1981|Marsala;Monza;Nice;Monaco;Manchester United;Juventus;Marseille;West Ham
Dimitri Payet|FRA|MIL|1987|Nantes;Saint-Étienne;Lille;Marseille;West Ham;Marseille;Vasco da Gama
Steve Mandanda|FRA|GB|1985|Le Havre;Marseille;Crystal Palace;Marseille;Rennes
Laurent Koscielny|FRA|DEF|1985|Guingamp;Tours;Lorient;Arsenal;Bordeaux
Lucas Hernandez|FRA|DEF|1996|Atlético Madrid;Bayern Munich;Paris SG
Theo Hernandez|FRA|DEF|1997|Atlético Madrid;Alavés;Real Madrid;Real Sociedad;AC Milan;Al-Hilal
Aurélien Tchouaméni|FRA|MIL|2000|Bordeaux;Monaco;Real Madrid
Eduardo Camavinga|FRA|MIL|2002|Rennes;Real Madrid
Jules Koundé|FRA|DEF|1998|Bordeaux;Séville FC;FC Barcelone
William Saliba|FRA|DEF|2001|Saint-Étienne;Arsenal;Nice;Marseille;Arsenal
Mike Maignan|FRA|GB|1995|Paris SG;Lille;AC Milan
Marcus Thuram|FRA|ATT|1997|Sochaux;Guingamp;Mönchengladbach;Inter Milan
Randal Kolo Muani|FRA|ATT|1998|Nantes;Eintracht Francfort;Paris SG;Juventus;Tottenham
Bradley Barcola|FRA|AIL|2002|Lyon;Paris SG
Michael Olise|FRA|AIL|2001|Reading;Crystal Palace;Bayern Munich
Désiré Doué|FRA|AIL|2005|Rennes;Paris SG
Alexandre Lacazette|FRA|ATT|1991|Lyon;Arsenal;Lyon;Neom
Anthony Martial|FRA|ATT|1995|Lyon;Monaco;Manchester United;Séville FC;AEK Athènes;Monterrey
Wissam Ben Yedder|FRA|ATT|1990|Toulouse;Séville FC;Monaco
Nabil Fekir|FRA|MIL|1993|Lyon;Betis Séville;Al-Jazira
Ferland Mendy|FRA|DEF|1995|Le Havre;Lyon;Real Madrid
Benjamin Pavard|FRA|DEF|1996|Lille;Stuttgart;Bayern Munich;Inter Milan;Marseille
Dayot Upamecano|FRA|DEF|1998|Salzbourg;RB Leipzig;Bayern Munich
Ibrahima Konaté|FRA|DEF|1999|Sochaux;RB Leipzig;Liverpool
Christopher Nkunku|FRA|ATT|1997|Paris SG;RB Leipzig;Chelsea;AC Milan
Warren Zaïre-Emery|FRA|MIL|2006|Paris SG
Corentin Tolisso|FRA|MIL|1994|Lyon;Bayern Munich;Lyon
Lucas Digne|FRA|DEF|1993|Lille;Paris SG;AS Roma;FC Barcelone;Everton;Aston Villa
Eden Hazard|BEL|AIL|1991|Lille;Chelsea;Real Madrid
Kevin De Bruyne|BEL|MIL|1991|Genk;Chelsea;Werder Brême;Wolfsburg;Manchester City;Napoli
Romelu Lukaku|BEL|ATT|1993|Anderlecht;Chelsea;West Bromwich;Everton;Manchester United;Inter Milan;Chelsea;AS Roma;Napoli
Thibaut Courtois|BEL|GB|1992|Genk;Chelsea;Atlético Madrid;Real Madrid
Vincent Kompany|BEL|DEF|1986|Anderlecht;Hambourg;Manchester City;Anderlecht
Axel Witsel|BEL|MIL|1989|Standard de Liège;Benfica;Zénith Saint-Pétersbourg;Tianjin;Borussia Dortmund;Atlético Madrid;Girona
Dries Mertens|BEL|AIL|1987|Utrecht;PSV Eindhoven;Napoli;Galatasaray
Jan Vertonghen|BEL|DEF|1987|Ajax;Tottenham;Benfica;Anderlecht
Jérémy Doku|BEL|AIL|2002|Anderlecht;Rennes;Manchester City
Leandro Trossard|BEL|AIL|1994|Genk;Brighton;Arsenal
Youri Tielemans|BEL|MIL|1997|Anderlecht;Monaco;Leicester;Aston Villa
Thomas Meunier|BEL|DEF|1991|Virton;Club Bruges;Paris SG;Borussia Dortmund;Trabzonspor;Lille
Radja Nainggolan|BEL|MIL|1988|Piacenza;Cagliari;AS Roma;Inter Milan;Cagliari;Antwerp
Marouane Fellaini|BEL|MIL|1987|Standard de Liège;Everton;Manchester United;Shandong Taishan
Cristiano Ronaldo|POR|ATT|1985|Sporting;Manchester United;Real Madrid;Juventus;Manchester United;Al-Nassr|Cristiano;CR7
Luís Figo|POR|AIL|1972|Sporting;FC Barcelone;Real Madrid;Inter Milan|Figo
Rui Costa|POR|MIL|1972|Benfica;Fiorentina;AC Milan;Benfica
Deco|POR|MIL|1977|Salgueiros;FC Porto;FC Barcelone;Chelsea;Fluminense
Pepe|POR|DEF|1983|Marítimo;FC Porto;Real Madrid;Beşiktaş;FC Porto
Ricardo Carvalho|POR|DEF|1978|FC Porto;Chelsea;Real Madrid;Monaco;Shanghai SIPG
Nani|POR|AIL|1986|Sporting;Manchester United;Fenerbahçe;Valence;Lazio;Orlando City
Bruno Fernandes|POR|MIL|1994|Novara;Udinese;Sampdoria;Sporting;Manchester United
Bernardo Silva|POR|MIL|1994|Benfica;Monaco;Manchester City
João Félix|POR|ATT|1999|Benfica;Atlético Madrid;Chelsea;FC Barcelone;AC Milan;Al-Nassr|Joao Felix;Félix
Rúben Dias|POR|DEF|1997|Benfica;Manchester City|Ruben Dias
Rafael Leão|POR|AIL|1999|Sporting;Lille;AC Milan|Leao
Vitinha|POR|MIL|2000|FC Porto;Wolverhampton;Paris SG
Nuno Mendes|POR|DEF|2002|Sporting;Paris SG
João Cancelo|POR|DEF|1994|Benfica;Valence;Inter Milan;Juventus;Manchester City;Bayern Munich;FC Barcelone;Al-Hilal|Cancelo
Diogo Jota|POR|ATT|1996|Paços de Ferreira;Atlético Madrid;FC Porto;Wolverhampton;Liverpool|Jota
Ricardo Quaresma|POR|AIL|1983|Sporting;FC Barcelone;FC Porto;Inter Milan;Chelsea;Beşiktaş;Al-Ahli;FC Porto;Beşiktaş
Lionel Messi|ARG|ATT|1987|FC Barcelone;Paris SG;Inter Miami|Messi;Leo Messi
Diego Maradona|ARG|ATT|1960|Argentinos Juniors;Boca Juniors;FC Barcelone;Napoli;Séville FC;Newell's Old Boys;Boca Juniors|Maradona
Sergio Agüero|ARG|ATT|1988|Independiente;Atlético Madrid;Manchester City;FC Barcelone|Aguero;Kun Agüero
Ángel Di María|ARG|AIL|1988|Rosario Central;Benfica;Real Madrid;Manchester United;Paris SG;Juventus;Benfica;Rosario Central|Di Maria
Javier Mascherano|ARG|MIL|1984|River Plate;Corinthians;West Ham;Liverpool;FC Barcelone;Hebei;Estudiantes
Gabriel Batistuta|ARG|ATT|1969|Newell's Old Boys;River Plate;Boca Juniors;Fiorentina;AS Roma;Inter Milan;Al-Arabi
Juan Román Riquelme|ARG|MIL|1978|Boca Juniors;FC Barcelone;Villarreal;Boca Juniors;Argentinos Juniors|Riquelme
Carlos Tévez|ARG|ATT|1984|Boca Juniors;Corinthians;West Ham;Manchester United;Manchester City;Juventus;Boca Juniors;Shanghai Shenhua;Boca Juniors|Tevez
Hernán Crespo|ARG|ATT|1975|River Plate;Parme;Lazio;Inter Milan;Chelsea;AC Milan;Inter Milan;Genoa;Parme|Crespo
Gonzalo Higuaín|ARG|ATT|1987|River Plate;Real Madrid;Napoli;Juventus;AC Milan;Chelsea;Inter Miami|Higuain
Paulo Dybala|ARG|ATT|1993|Instituto;Palerme;Juventus;AS Roma
Lautaro Martínez|ARG|ATT|1997|Racing Club;Inter Milan|Lautaro
Emiliano Martínez|ARG|GB|1992|Arsenal;Aston Villa|Dibu Martínez;Emi Martinez
Julián Álvarez|ARG|ATT|2000|River Plate;Manchester City;Atlético Madrid|Julian Alvarez
Enzo Fernández|ARG|MIL|2001|River Plate;Benfica;Chelsea|Enzo Fernandez
Rodrigo De Paul|ARG|MIL|1994|Racing Club;Valence;Udinese;Atlético Madrid;Inter Miami
Esteban Cambiasso|ARG|MIL|1980|River Plate;Real Madrid;Inter Milan;Leicester;Olympiakos
Javier Zanetti|ARG|DEF|1973|Talleres;Banfield;Inter Milan
Fernando Redondo|ARG|MIL|1969|Argentinos Juniors;Tenerife;Real Madrid;AC Milan
Ronaldo|BRA|ATT|1976|Cruzeiro;PSV Eindhoven;FC Barcelone;Inter Milan;Real Madrid;AC Milan;Corinthians|Ronaldo Nazário;Ronaldo Nazario;R9
Ronaldinho|BRA|ATT|1980|Grêmio;Paris SG;FC Barcelone;AC Milan;Flamengo;Atlético Mineiro;Querétaro;Fluminense
Rivaldo|BRA|MIL|1972|Corinthians;Palmeiras;Deportivo La Corogne;FC Barcelone;AC Milan;Olympiakos;AEK Athènes;Bunyodkor;São Paulo
Kaká|BRA|MIL|1982|São Paulo;AC Milan;Real Madrid;AC Milan;Orlando City|Kaka
Neymar|BRA|ATT|1992|Santos;FC Barcelone;Paris SG;Al-Hilal;Santos
Roberto Carlos|BRA|DEF|1973|Palmeiras;Inter Milan;Real Madrid;Fenerbahçe;Corinthians;Anji
Cafu|BRA|DEF|1970|São Paulo;Real Saragosse;Palmeiras;AS Roma;AC Milan
Dani Alves|BRA|DEF|1983|Bahia;Séville FC;FC Barcelone;Juventus;Paris SG;São Paulo;FC Barcelone;Pumas|Daniel Alves;Alves
Thiago Silva|BRA|DEF|1984|Fluminense;AC Milan;Paris SG;Chelsea;Fluminense
Marcelo|BRA|DEF|1988|Fluminense;Real Madrid;Olympiakos;Fluminense
Casemiro|BRA|MIL|1992|São Paulo;Real Madrid;FC Porto;Real Madrid;Manchester United
Vinícius Júnior|BRA|AIL|2000|Flamengo;Real Madrid|Vinicius;Vinicius Junior;Vini Jr
Rodrygo|BRA|AIL|2001|Santos;Real Madrid
Alisson|BRA|GB|1992|Internacional;AS Roma;Liverpool|Alisson Becker
Ederson|BRA|GB|1993|Rio Ave;Benfica;Manchester City;Fenerbahçe
Philippe Coutinho|BRA|MIL|1992|Vasco da Gama;Inter Milan;Espanyol;Liverpool;FC Barcelone;Bayern Munich;Aston Villa;Al-Duhail;Vasco da Gama
Roberto Firmino|BRA|ATT|1991|Figueirense;Hoffenheim;Liverpool;Al-Ahli
Fabinho|BRA|MIL|1993|Rio Ave;Real Madrid;Monaco;Liverpool;Al-Ittihad
Pelé|BRA|ATT|1940|Santos;New York Cosmos|Pele
Zico|BRA|MIL|1953|Flamengo;Udinese;Flamengo;Kashima Antlers
Romário|BRA|ATT|1966|Vasco da Gama;PSV Eindhoven;FC Barcelone;Flamengo;Valence;Vasco da Gama;Fluminense|Romario
Adriano|BRA|ATT|1982|Flamengo;Inter Milan;Fiorentina;Parme;Inter Milan;São Paulo;Flamengo;AS Roma;Corinthians
Hulk|BRA|ATT|1986|Vitória;Kawasaki Frontale;Tokyo Verdy;FC Porto;Zénith Saint-Pétersbourg;Shanghai SIPG;Atlético Mineiro
Oscar|BRA|MIL|1991|São Paulo;Internacional;Chelsea;Shanghai SIPG;São Paulo
Willian|BRA|AIL|1988|Corinthians;Shakhtar Donetsk;Anji;Chelsea;Arsenal;Corinthians;Fulham
Raphinha|BRA|AIL|1996|Vitória Guimarães;Sporting;Rennes;Leeds;FC Barcelone
Gabriel Jesus|BRA|ATT|1997|Palmeiras;Manchester City;Arsenal
Richarlison|BRA|ATT|1997|América Mineiro;Fluminense;Watford;Everton;Tottenham
Marquinhos|BRA|DEF|1994|Corinthians;AS Roma;Paris SG
David Luiz|BRA|DEF|1987|Vitória;Benfica;Chelsea;Paris SG;Chelsea;Arsenal;Flamengo;Fortaleza
Endrick|BRA|ATT|2006|Palmeiras;Real Madrid
Andrés Iniesta|ESP|MIL|1984|FC Barcelone;Vissel Kobe;Emirates Club|Iniesta
Xavi|ESP|MIL|1980|FC Barcelone;Al-Sadd|Xavi Hernández;Xavi Hernandez
Sergio Busquets|ESP|MIL|1988|FC Barcelone;Inter Miami|Busquets
Sergio Ramos|ESP|DEF|1986|Séville FC;Real Madrid;Paris SG;Séville FC;Monterrey|Ramos
Iker Casillas|ESP|GB|1981|Real Madrid;FC Porto|Casillas
Gerard Piqué|ESP|DEF|1987|Manchester United;Real Saragosse;FC Barcelone|Pique
Carles Puyol|ESP|DEF|1978|FC Barcelone|Puyol
David Villa|ESP|ATT|1981|Sporting Gijón;Real Saragosse;Valence;FC Barcelone;Atlético Madrid;New York City;Melbourne City;Vissel Kobe
Fernando Torres|ESP|ATT|1984|Atlético Madrid;Liverpool;Chelsea;AC Milan;Atlético Madrid;Sagan Tosu
Raúl|ESP|ATT|1977|Real Madrid;Schalke 04;Al-Sadd;New York Cosmos|Raul;Raúl González
David Silva|ESP|MIL|1986|Valence;Manchester City;Real Sociedad
Cesc Fàbregas|ESP|MIL|1987|Arsenal;FC Barcelone;Chelsea;Monaco;Côme|Fabregas;Cesc
Xabi Alonso|ESP|MIL|1981|Real Sociedad;Liverpool;Real Madrid;Bayern Munich
Juan Mata|ESP|MIL|1988|Valence;Chelsea;Manchester United;Galatasaray;Vissel Kobe;Western Sydney
Diego Costa|ESP|ATT|1988|Braga;Atlético Madrid;Chelsea;Atlético Madrid;Atlético Mineiro;Wolverhampton;Botafogo
Pedri|ESP|MIL|2002|Las Palmas;FC Barcelone
Gavi|ESP|MIL|2004|FC Barcelone
Lamine Yamal|ESP|AIL|2007|FC Barcelone|Yamal
Rodri|ESP|MIL|1996|Villarreal;Atlético Madrid;Manchester City
Álvaro Morata|ESP|ATT|1992|Real Madrid;Juventus;Real Madrid;Chelsea;Atlético Madrid;Juventus;Atlético Madrid;AC Milan;Galatasaray;Côme|Morata
Thiago Alcántara|ESP|MIL|1991|FC Barcelone;Bayern Munich;Liverpool|Thiago
Jordi Alba|ESP|DEF|1989|Valence;FC Barcelone;Inter Miami
Dani Carvajal|ESP|DEF|1992|Bayer Leverkusen;Real Madrid|Carvajal
Luis Enrique|ESP|MIL|1970|Sporting Gijón;Real Madrid;FC Barcelone
Pep Guardiola|ESP|MIL|1971|FC Barcelone;Brescia;AS Roma;Brescia;Al-Ahli;Dorados|Guardiola
Fernando Morientes|ESP|ATT|1976|Albacete;Real Saragosse;Real Madrid;Monaco;Liverpool;Valence;Marseille|Morientes
Santi Cazorla|ESP|MIL|1984|Villarreal;Recreativo Huelva;Villarreal;Málaga;Arsenal;Villarreal;Al-Sadd;Oviedo|Cazorla
Isco|ESP|MIL|1992|Valence;Málaga;Real Madrid;Séville FC;Betis Séville
Marco Asensio|ESP|AIL|1996|Mallorca;Real Madrid;Paris SG;Aston Villa;Fenerbahçe|Asensio
Nico Williams|ESP|AIL|2002|Athletic Bilbao
Dani Olmo|ESP|MIL|1998|Dinamo Zagreb;RB Leipzig;FC Barcelone
Mikel Oyarzabal|ESP|AIL|1997|Real Sociedad|Oyarzabal
Unai Simón|ESP|GB|1997|Athletic Bilbao|Unai Simon
Iago Aspas|ESP|ATT|1987|Celta Vigo;Liverpool;Séville FC;Celta Vigo|Aspas
Luka Modrić|CRO|MIL|1985|Dinamo Zagreb;Tottenham;Real Madrid;AC Milan|Modric
Ivan Rakitić|CRO|MIL|1988|Bâle;Schalke 04;Séville FC;FC Barcelone;Séville FC;Al-Shabab;Hajduk Split|Rakitic
Mario Mandžukić|CRO|ATT|1986|Dinamo Zagreb;Wolfsburg;Bayern Munich;Atlético Madrid;Juventus;Al-Duhail;AC Milan|Mandzukic
Davor Šuker|CRO|ATT|1968|Osijek;Dinamo Zagreb;Séville FC;Real Madrid;Arsenal;West Ham;1860 Munich|Suker
Ivan Perišić|CRO|AIL|1989|Club Bruges;Borussia Dortmund;Wolfsburg;Inter Milan;Bayern Munich;Inter Milan;Tottenham;Hajduk Split;PSV Eindhoven|Perisic
Marcelo Brozović|CRO|MIL|1992|Dinamo Zagreb;Inter Milan;Al-Nassr|Brozovic
Zlatan Ibrahimović|SWE|ATT|1981|Malmö;Ajax;Juventus;Inter Milan;FC Barcelone;AC Milan;Paris SG;Manchester United;LA Galaxy;AC Milan|Ibrahimovic;Zlatan;Ibra
Henrik Larsson|SWE|ATT|1971|Helsingborg;Feyenoord;Celtic;FC Barcelone;Helsingborg;Manchester United
Viktor Gyökeres|SWE|ATT|1998|Brommapojkarna;Brighton;Coventry;Sporting;Arsenal|Gyokeres
Alexander Isak|SWE|ATT|1999|AIK;Borussia Dortmund;Willem II;Real Sociedad;Newcastle;Liverpool|Isak
Erling Haaland|NOR|ATT|2000|Bryne;Molde;Salzbourg;Borussia Dortmund;Manchester City|Haaland
Martin Ødegaard|NOR|MIL|1998|Strømsgodset;Real Madrid;Heerenveen;Vitesse;Real Sociedad;Arsenal|Odegaard
Robert Lewandowski|POL|ATT|1988|Znicz Pruszków;Lech Poznań;Borussia Dortmund;Bayern Munich;FC Barcelone|Lewandowski
Wojciech Szczęsny|POL|GB|1990|Arsenal;Brentford;AS Roma;Juventus;FC Barcelone|Szczesny
Luis Suárez|URU|ATT|1987|Nacional;Groningen;Ajax;Liverpool;FC Barcelone;Atlético Madrid;Nacional;Grêmio;Inter Miami|Suarez;Luis Suarez
Edinson Cavani|URU|ATT|1987|Danubio;Palerme;Napoli;Paris SG;Manchester United;Valence;Boca Juniors|Cavani
Diego Forlán|URU|ATT|1979|Independiente;Manchester United;Villarreal;Atlético Madrid;Inter Milan;Internacional;Cerezo Osaka;Peñarol;Mumbai City|Forlan
Diego Godín|URU|DEF|1986|Cerro;Nacional;Villarreal;Atlético Madrid;Inter Milan;Cagliari;Atlético Mineiro;Vélez Sarsfield|Godin
Federico Valverde|URU|MIL|1998|Peñarol;Real Madrid|Valverde
Darwin Núñez|URU|ATT|1999|Peñarol;Almería;Benfica;Liverpool;Al-Hilal|Darwin Nunez;Nunez
Alexis Sánchez|CHI|ATT|1988|Cobreloa;Colo-Colo;River Plate;Udinese;FC Barcelone;Arsenal;Manchester United;Inter Milan;Marseille;Inter Milan;Udinese;Séville FC|Alexis Sanchez
Arturo Vidal|CHI|MIL|1987|Colo-Colo;Bayer Leverkusen;Juventus;Bayern Munich;FC Barcelone;Inter Milan;Flamengo;Athletico Paranaense;Colo-Colo|Vidal
James Rodríguez|COL|MIL|1991|Envigado;Banfield;FC Porto;Monaco;Real Madrid;Bayern Munich;Everton;Al-Rayyan;Olympiakos;São Paulo;Rayo Vallecano;Club León|James;James Rodriguez
Radamel Falcao|COL|ATT|1986|River Plate;FC Porto;Atlético Madrid;Monaco;Manchester United;Chelsea;Galatasaray;Rayo Vallecano;Millonarios|Falcao
Luis Díaz|COL|AIL|1997|Barranquilla;Junior;FC Porto;Liverpool;Bayern Munich|Luis Diaz;Lucho Díaz
Juan Cuadrado|COL|AIL|1988|Independiente Medellín;Udinese;Lecce;Fiorentina;Chelsea;Juventus;Inter Milan;Atalanta;Pisa|Cuadrado
Mohamed Salah|EGY|AIL|1992|Al Mokawloon;Bâle;Chelsea;Fiorentina;AS Roma;Liverpool|Salah;Mo Salah
Sadio Mané|SEN|AIL|1992|Metz;Salzbourg;Southampton;Liverpool;Bayern Munich;Al-Nassr|Mane;Sadio Mane
Kalidou Koulibaly|SEN|DEF|1991|Metz;Genk;Napoli;Chelsea;Al-Hilal|Koulibaly
El Hadji Diouf|SEN|ATT|1981|Sochaux;Rennes;Lens;Liverpool;Bolton;Sunderland;Blackburn;Rangers;Doncaster;Leeds;Sabah|Diouf
Didier Drogba|CIV|ATT|1978|Le Mans;Guingamp;Marseille;Chelsea;Shanghai Shenhua;Galatasaray;Chelsea;Montréal;Phoenix Rising|Drogba
Yaya Touré|CIV|MIL|1983|ASEC Mimosas;Beveren;Metalurh Donetsk;Olympiakos;Monaco;FC Barcelone;Manchester City;Olympiakos;Qingdao|Yaya Toure
Sébastien Haller|CIV|ATT|1994|Auxerre;Utrecht;Eintracht Francfort;West Ham;Ajax;Borussia Dortmund;Leganés;Utrecht|Haller
Wilfried Zaha|CIV|AIL|1992|Crystal Palace;Manchester United;Crystal Palace;Galatasaray;Charlotte|Zaha
Nicolas Pépé|CIV|AIL|1995|Angers;Lille;Arsenal;Nice;Trabzonspor;Villarreal|Pepe Nicolas;Nicolas Pepe
Franck Kessié|CIV|MIL|1996|Atalanta;AC Milan;FC Barcelone;Al-Ahli|Kessie
Samuel Eto'o|CMR|ATT|1981|Real Madrid;Leganés;Espanyol;Mallorca;FC Barcelone;Inter Milan;Anji;Chelsea;Everton;Sampdoria;Antalyaspor;Konyaspor;Qatar SC|Eto'o;Etoo;Eto o
Roger Milla|CMR|ATT|1952|Tonnerre Yaoundé;Valenciennes;Monaco;Bastia;Saint-Étienne;Montpellier|Milla
André Onana|CMR|GB|1996|Ajax;Inter Milan;Manchester United;Trabzonspor|Onana
George Weah|LBR|ATT|1966|Tonnerre Yaoundé;Monaco;Paris SG;AC Milan;Chelsea;Manchester City;Marseille;Al-Jazira|Weah
Jay-Jay Okocha|NGA|MIL|1973|Eintracht Francfort;Fenerbahçe;Paris SG;Bolton;Qatar SC;Hull City|Okocha;Jay Jay Okocha
Victor Osimhen|NGA|ATT|1998|Wolfsburg;Charleroi;Lille;Napoli;Galatasaray|Osimhen
Nwankwo Kanu|NGA|ATT|1976|Ajax;Inter Milan;Arsenal;West Bromwich;Portsmouth|Kanu
Ademola Lookman|NGA|AIL|1997|Charlton;Everton;RB Leipzig;Fulham;Leicester;Atalanta|Lookman
Emmanuel Adebayor|TOG|ATT|1984|Metz;Monaco;Arsenal;Manchester City;Real Madrid;Tottenham;Crystal Palace;Başakşehir;Kayserispor;Olimpia|Adebayor
Abedi Pelé|GHA|MIL|1964|Niort;Marseille;Lille;Marseille;Lyon;Torino;1860 Munich;Al-Ain|Abedi Pele;Abedi Ayew
Michael Essien|GHA|MIL|1982|Bastia;Lyon;Chelsea;Real Madrid;AC Milan;Panathinaïkos;Persib|Essien
Asamoah Gyan|GHA|ATT|1985|Udinese;Modène;Rennes;Sunderland;Al-Ain;Shanghai SIPG;Kayserispor|Gyan
Thomas Partey|GHA|MIL|1993|Atlético Madrid;Arsenal;Villarreal|Partey
Mohammed Kudus|GHA|AIL|2000|Nordsjælland;Ajax;West Ham;Tottenham|Kudus
Serhou Guirassy|GUI|ATT|1996|Lille;Cologne;Amiens;Rennes;Stuttgart;Borussia Dortmund|Guirassy
Pierre-Emerick Aubameyang|GAB|ATT|1989|AC Milan;Dijon;Lille;Monaco;Saint-Étienne;Borussia Dortmund;Arsenal;FC Barcelone;Chelsea;Marseille;Al-Qadsiah;Marseille|Aubameyang
Achraf Hakimi|MAR|DEF|1998|Real Madrid;Borussia Dortmund;Inter Milan;Paris SG|Hakimi
Hakim Ziyech|MAR|AIL|1993|Heerenveen;Twente;Ajax;Chelsea;Galatasaray;Al-Duhail;Wydad|Ziyech
Yassine Bounou|MAR|GB|1991|Wydad;Atlético Madrid;Real Saragosse;Girona;Séville FC;Al-Hilal|Bono;Bounou
Mehdi Benatia|MAR|DEF|1987|Clermont;Udinese;AS Roma;Bayern Munich;Juventus;Al-Duhail|Benatia
Marouane Chamakh|MAR|ATT|1984|Bordeaux;Arsenal;Crystal Palace;Cardiff|Chamakh
Youssef En-Nesyri|MAR|ATT|1997|Málaga;Leganés;Séville FC;Fenerbahçe|En-Nesyri;En Nesyri
Brahim Díaz|MAR|AIL|1999|Manchester City;Real Madrid;AC Milan;Real Madrid|Brahim;Brahim Diaz
Sofyan Amrabat|MAR|MIL|1996|Utrecht;Feyenoord;Club Bruges;Hellas Vérone;Fiorentina;Manchester United;Fenerbahçe|Amrabat
Noussair Mazraoui|MAR|DEF|1997|Ajax;Bayern Munich;Manchester United|Mazraoui
Wahbi Khazri|TUN|ATT|1991|Bastia;Bordeaux;Sunderland;Rennes;Saint-Étienne;Montpellier|Khazri
Riyad Mahrez|ALG|AIL|1991|Quimper;Le Havre;Leicester;Manchester City;Al-Ahli|Mahrez
Islam Slimani|ALG|ATT|1988|CR Belouizdad;Sporting;Leicester;Monaco;Lyon;Brest;Anderlecht|Slimani
Yacine Brahimi|ALG|AIL|1990|Rennes;Grenade;FC Porto;Al-Rayyan;Al-Gharafa|Brahimi
Sofiane Feghouli|ALG|MIL|1989|Grenoble;Valence;West Ham;Galatasaray;Fatih Karagümrük|Feghouli
Rabah Madjer|ALG|ATT|1958|NA Hussein Dey;Racing Paris;FC Porto;Valence;FC Porto|Madjer
Ismaël Bennacer|ALG|MIL|1997|Arsenal;Empoli;AC Milan;Marseille|Bennacer
Aïssa Mandi|ALG|DEF|1991|Reims;Betis Séville;Villarreal;Lille|Mandi
Ramy Bensebaini|ALG|DEF|1995|Paradou;Montpellier;Rennes;Mönchengladbach;Borussia Dortmund|Bensebaini
Nabil Bentaleb|ALG|MIL|1994|Tottenham;Schalke 04;Angers;Lille|Bentaleb
Baghdad Bounedjah|ALG|ATT|1991|USM El Harrach;Étoile du Sahel;Al-Sadd;Al-Shamal|Bounedjah
Youcef Belaïli|ALG|AIL|1992|MC Oran;Espérance de Tunis;Angers;Brest;Ajaccio;MC Alger|Belaili
Madjid Bougherra|ALG|DEF|1982|Gueugnon;Crewe Alexandra;Sheffield Wednesday;Charlton;Rangers;Lekhwiya;Fujairah|Bougherra
Karim Ziani|ALG|MIL|1982|Troyes;Lorient;Sochaux;Marseille;Wolfsburg;Kayserispor;Al-Jaish;Al-Arabi;Ajaccio;Orléans|Ziani
Amine Gouiri|ALG|ATT|2000|Lyon;Nice;Rennes;Marseille|Gouiri
Houssem Aouar|ALG|MIL|1998|Lyon;AS Roma;Al-Ittihad|Aouar
Saïd Benrahma|ALG|AIL|1995|Nice;Brentford;West Ham;Lyon;Neom|Benrahma
Farès Chaïbi|ALG|MIL|2002|Toulouse;Eintracht Francfort|Chaibi
Mohamed Amoura|ALG|ATT|2000|ES Sétif;Lugano;Union Saint-Gilloise;Wolfsburg|Amoura
Antar Yahia|ALG|DEF|1982|Bastia;Nice;Bochum;Al-Nassr;Angers;Platanias|Yahia
Harry Kane|ENG|ATT|1993|Leyton Orient;Millwall;Norwich;Leicester;Tottenham;Bayern Munich|Kane
Wayne Rooney|ENG|ATT|1985|Everton;Manchester United;Everton;DC United;Derby County|Rooney
David Beckham|ENG|MIL|1975|Manchester United;Preston;Real Madrid;LA Galaxy;AC Milan;Paris SG|Beckham
Steven Gerrard|ENG|MIL|1980|Liverpool;LA Galaxy|Gerrard
Frank Lampard|ENG|MIL|1978|West Ham;Swansea;Chelsea;Manchester City;New York City|Lampard
John Terry|ENG|DEF|1980|Chelsea;Nottingham Forest;Aston Villa|Terry
Rio Ferdinand|ENG|DEF|1978|West Ham;Bournemouth;Leeds;Manchester United;Queens Park Rangers|Ferdinand
Paul Scholes|ENG|MIL|1974|Manchester United|Scholes
Ryan Giggs|WAL|AIL|1973|Manchester United|Giggs
Gareth Bale|WAL|AIL|1989|Southampton;Tottenham;Real Madrid;Tottenham;Los Angeles FC|Bale
Aaron Ramsey|WAL|MIL|1990|Cardiff;Arsenal;Juventus;Rangers;Cardiff;Pumas|Ramsey
Alan Shearer|ENG|ATT|1970|Southampton;Blackburn;Newcastle|Shearer
Michael Owen|ENG|ATT|1979|Liverpool;Real Madrid;Newcastle;Manchester United;Stoke City|Owen
Ashley Cole|ENG|DEF|1980|Arsenal;Crystal Palace;Chelsea;AS Roma;LA Galaxy;Derby County
Raheem Sterling|ENG|AIL|1994|Liverpool;Manchester City;Chelsea;Arsenal|Sterling
Jude Bellingham|ENG|MIL|2003|Birmingham;Borussia Dortmund;Real Madrid|Bellingham
Declan Rice|ENG|MIL|1999|West Ham;Arsenal|Rice
Bukayo Saka|ENG|AIL|2001|Arsenal|Saka
Phil Foden|ENG|MIL|2000|Manchester City|Foden
Trent Alexander-Arnold|ENG|DEF|1998|Liverpool;Real Madrid|Alexander-Arnold;Trent
Jack Grealish|ENG|AIL|1995|Aston Villa;Notts County;Manchester City;Everton|Grealish
Marcus Rashford|ENG|ATT|1997|Manchester United;Aston Villa;FC Barcelone|Rashford
Kyle Walker|ENG|DEF|1990|Sheffield United;Tottenham;Manchester City;AC Milan;Burnley|Walker
Jordan Henderson|ENG|MIL|1990|Sunderland;Liverpool;Al-Ettifaq;Ajax;Brentford|Henderson
Cole Palmer|ENG|MIL|2002|Manchester City;Chelsea|Palmer
Harry Maguire|ENG|DEF|1993|Sheffield United;Hull City;Leicester;Manchester United|Maguire
Ivan Toney|ENG|ATT|1996|Northampton;Newcastle;Peterborough;Brentford;Al-Ahli|Toney
Gary Lineker|ENG|ATT|1960|Leicester;Everton;FC Barcelone;Tottenham;Nagoya Grampus|Lineker
Paul Gascoigne|ENG|MIL|1967|Newcastle;Tottenham;Lazio;Rangers;Middlesbrough;Everton;Burnley|Gascoigne;Gazza
Roy Keane|IRL|MIL|1971|Cobh Ramblers;Nottingham Forest;Manchester United;Celtic|Roy Keane
Robbie Keane|IRL|ATT|1980|Wolverhampton;Coventry;Inter Milan;Leeds;Tottenham;Liverpool;Tottenham;LA Galaxy|Robbie Keane
Gianluigi Buffon|ITA|GB|1978|Parme;Juventus;Paris SG;Juventus;Parme|Buffon
Paolo Maldini|ITA|DEF|1968|AC Milan|Maldini
Andrea Pirlo|ITA|MIL|1979|Brescia;Inter Milan;Reggina;Brescia;AC Milan;Juventus;New York City|Pirlo
Francesco Totti|ITA|ATT|1976|AS Roma|Totti
Alessandro Del Piero|ITA|ATT|1974|Padoue;Juventus;Sydney FC;Delhi Dynamos|Del Piero
Fabio Cannavaro|ITA|DEF|1973|Napoli;Parme;Inter Milan;Juventus;Real Madrid;Juventus;Al-Ahli|Cannavaro
Roberto Baggio|ITA|ATT|1967|Vicenza;Fiorentina;Juventus;AC Milan;Bologne;Inter Milan;Brescia|Baggio
Christian Vieri|ITA|ATT|1973|Torino;Atalanta;Juventus;Atlético Madrid;Lazio;Inter Milan;AC Milan;Monaco;Fiorentina|Vieri
Filippo Inzaghi|ITA|ATT|1973|Piacenza;Parme;Atalanta;Juventus;AC Milan|Inzaghi;Pippo Inzaghi
Gennaro Gattuso|ITA|MIL|1978|Pérouse;Rangers;Salernitana;AC Milan;Sion|Gattuso
Daniele De Rossi|ITA|MIL|1983|AS Roma;Boca Juniors|De Rossi
Giorgio Chiellini|ITA|DEF|1984|Livourne;Fiorentina;Juventus;Los Angeles FC|Chiellini
Leonardo Bonucci|ITA|DEF|1987|Inter Milan;Bari;Juventus;AC Milan;Juventus;Union Berlin;Fenerbahçe|Bonucci
Marco Verratti|ITA|MIL|1992|Pescara;Paris SG;Al-Arabi;Al-Duhail|Verratti
Mario Balotelli|ITA|ATT|1990|Inter Milan;Manchester City;AC Milan;Liverpool;Nice;Marseille;Brescia;Monza;Adana Demirspor;Sion;Genoa|Balotelli
Gianluigi Donnarumma|ITA|GB|1999|AC Milan;Paris SG;Manchester City|Donnarumma
Federico Chiesa|ITA|AIL|1997|Fiorentina;Juventus;Liverpool|Chiesa
Nicolò Barella|ITA|MIL|1997|Cagliari;Inter Milan|Barella
Ciro Immobile|ITA|ATT|1990|Pescara;Genoa;Torino;Borussia Dortmund;Séville FC;Lazio;Beşiktaş;Bologne|Immobile
Alessandro Nesta|ITA|DEF|1976|Lazio;AC Milan;Montréal;Chennaiyin|Nesta
Luca Toni|ITA|ATT|1977|Vicenza;Brescia;Palerme;Fiorentina;Bayern Munich;AS Roma;Genoa;Juventus;Hellas Vérone|Toni
Antonio Cassano|ITA|ATT|1982|Bari;AS Roma;Real Madrid;Sampdoria;AC Milan;Inter Milan;Parme;Sampdoria;Hellas Vérone|Cassano
Marco Materazzi|ITA|DEF|1973|Pérouse;Everton;Pérouse;Inter Milan;Chennaiyin|Materazzi
Franco Baresi|ITA|DEF|1960|AC Milan|Baresi
Carlo Ancelotti|ITA|MIL|1959|Parme;AS Roma;AC Milan|Ancelotti
Gianfranco Zola|ITA|ATT|1966|Torres;Napoli;Parme;Chelsea;Cagliari|Zola
Gianluca Vialli|ITA|ATT|1964|Cremonese;Sampdoria;Juventus;Chelsea|Vialli
Sandro Tonali|ITA|MIL|2000|Brescia;AC Milan;Newcastle|Tonali
Alessandro Bastoni|ITA|DEF|1999|Atalanta;Inter Milan|Bastoni
Miroslav Klose|GER|ATT|1978|Kaiserslautern;Werder Brême;Bayern Munich;Lazio|Klose
Philipp Lahm|GER|DEF|1983|Bayern Munich;Stuttgart;Bayern Munich|Lahm
Bastian Schweinsteiger|GER|MIL|1984|Bayern Munich;Manchester United;Chicago Fire|Schweinsteiger
Thomas Müller|GER|ATT|1989|Bayern Munich;Vancouver|Thomas Muller;Müller
Manuel Neuer|GER|GB|1986|Schalke 04;Bayern Munich|Neuer
Toni Kroos|GER|MIL|1990|Bayern Munich;Bayer Leverkusen;Real Madrid|Kroos
Mesut Özil|GER|MIL|1988|Schalke 04;Werder Brême;Real Madrid;Arsenal;Fenerbahçe;Başakşehir|Ozil;Özil
Lukas Podolski|GER|ATT|1985|Cologne;Bayern Munich;Cologne;Arsenal;Inter Milan;Galatasaray;Vissel Kobe;Antalyaspor;Górnik Zabrze|Podolski
Oliver Kahn|GER|GB|1969|Karlsruhe;Bayern Munich|Kahn
Lothar Matthäus|GER|MIL|1961|Mönchengladbach;Bayern Munich;Inter Milan;Bayern Munich;New York Red Bulls|Matthaus;Matthäus
Jürgen Klinsmann|GER|ATT|1964|Stuttgart;Inter Milan;Monaco;Tottenham;Bayern Munich;Sampdoria;Tottenham|Klinsmann
Michael Ballack|GER|MIL|1976|Chemnitz;Kaiserslautern;Bayer Leverkusen;Bayern Munich;Chelsea;Bayer Leverkusen|Ballack
Marco Reus|GER|MIL|1989|Rot Weiss Ahlen;Mönchengladbach;Borussia Dortmund;LA Galaxy|Reus
Mats Hummels|GER|DEF|1988|Bayern Munich;Borussia Dortmund;Bayern Munich;Borussia Dortmund;AS Roma|Hummels
Jamal Musiala|GER|MIL|2003|Bayern Munich|Musiala
Joshua Kimmich|GER|MIL|1995|RB Leipzig;Bayern Munich|Kimmich
Kai Havertz|GER|ATT|1999|Bayer Leverkusen;Chelsea;Arsenal|Havertz
Leroy Sané|GER|AIL|1996|Schalke 04;Manchester City;Bayern Munich;Galatasaray|Sane;Leroy Sane
İlkay Gündoğan|GER|MIL|1990|Bochum;Nuremberg;Borussia Dortmund;Manchester City;FC Barcelone;Manchester City;Galatasaray|Gundogan;Ilkay Gundogan
Florian Wirtz|GER|MIL|2003|Bayer Leverkusen;Liverpool|Wirtz
Antonio Rüdiger|GER|DEF|1993|Stuttgart;AS Roma;Chelsea;Real Madrid|Rudiger;Rüdiger
Marc-André ter Stegen|GER|GB|1992|Mönchengladbach;FC Barcelone|Ter Stegen
Johan Cruyff|NED|ATT|1947|Ajax;FC Barcelone;Los Angeles Aztecs;Washington Diplomats;Levante;Ajax;Feyenoord|Cruyff;Cruijff
Marco van Basten|NED|ATT|1964|Ajax;AC Milan|Van Basten
Ruud Gullit|NED|MIL|1962|HFC Haarlem;Feyenoord;PSV Eindhoven;AC Milan;Sampdoria;AC Milan;Sampdoria;Chelsea|Gullit
Dennis Bergkamp|NED|ATT|1969|Ajax;Inter Milan;Arsenal|Bergkamp
Ruud van Nistelrooy|NED|ATT|1976|Den Bosch;Heerenveen;PSV Eindhoven;Manchester United;Real Madrid;Hambourg;Málaga|Van Nistelrooy
Arjen Robben|NED|AIL|1984|Groningen;PSV Eindhoven;Chelsea;Real Madrid;Bayern Munich;Groningen|Robben
Wesley Sneijder|NED|MIL|1984|Ajax;Real Madrid;Inter Milan;Galatasaray;Nice;Al-Gharafa|Sneijder
Robin van Persie|NED|ATT|1983|Feyenoord;Arsenal;Manchester United;Fenerbahçe;Feyenoord|Van Persie
Clarence Seedorf|NED|MIL|1976|Ajax;Sampdoria;Real Madrid;Inter Milan;AC Milan;Botafogo|Seedorf
Edgar Davids|NED|MIL|1973|Ajax;AC Milan;Juventus;FC Barcelone;Inter Milan;Tottenham;Ajax;Crystal Palace;Barnet|Davids
Patrick Kluivert|NED|ATT|1976|Ajax;AC Milan;FC Barcelone;Newcastle;Valence;PSV Eindhoven;Lille|Kluivert
Virgil van Dijk|NED|DEF|1991|Groningen;Celtic;Southampton;Liverpool|Van Dijk
Frenkie de Jong|NED|MIL|1997|Willem II;Ajax;FC Barcelone|De Jong;Frenkie
Memphis Depay|NED|ATT|1994|PSV Eindhoven;Manchester United;Lyon;FC Barcelone;Atlético Madrid;Corinthians|Memphis;Depay
Cody Gakpo|NED|AIL|1999|PSV Eindhoven;Liverpool|Gakpo
Georginio Wijnaldum|NED|MIL|1990|Feyenoord;PSV Eindhoven;Newcastle;Liverpool;Paris SG;AS Roma;Al-Ettifaq|Wijnaldum
Matthijs de Ligt|NED|DEF|1999|Ajax;Juventus;Bayern Munich;Manchester United|De Ligt
Marc Overmars|NED|AIL|1973|Go Ahead Eagles;Willem II;Ajax;Arsenal;FC Barcelone|Overmars
Edwin van der Sar|NED|GB|1970|Ajax;Juventus;Fulham;Manchester United|Van der Sar
Jaap Stam|NED|DEF|1972|Zwolle;Cambuur;Willem II;PSV Eindhoven;Manchester United;Lazio;AC Milan;Ajax|Stam
Pavel Nedvěd|CZE|MIL|1972|Dukla Prague;Sparta Prague;Lazio;Juventus|Nedved
Petr Čech|CZE|GB|1982|Chmel Blšany;Sparta Prague;Rennes;Chelsea;Arsenal|Cech
Andriy Shevchenko|UKR|ATT|1976|Dynamo Kiev;AC Milan;Chelsea;Dynamo Kiev|Shevchenko
Hristo Stoichkov|BUL|ATT|1966|CSKA Sofia;FC Barcelone;Parme;FC Barcelone;CSKA Sofia;Al-Nassr;Kashiwa Reysol;Chicago Fire;DC United|Stoichkov
Gheorghe Hagi|ROU|MIL|1965|Farul Constanța;Sportul Studențesc;Steaua Bucarest;Real Madrid;Brescia;FC Barcelone;Galatasaray|Hagi
Nemanja Vidić|SRB|DEF|1981|Étoile Rouge;Spartak Moscou;Manchester United;Inter Milan|Vidic
Dušan Vlahović|SRB|ATT|2000|Partizan;Fiorentina;Juventus|Vlahovic
Edin Džeko|BIH|ATT|1986|Željezničar;Teplice;Wolfsburg;Manchester City;AS Roma;Inter Milan;Fenerbahçe;Fiorentina|Dzeko
Miralem Pjanić|BIH|MIL|1990|Metz;Lyon;AS Roma;Juventus;FC Barcelone;Beşiktaş;Sharjah;CSKA Moscou|Pjanic
Jan Oblak|SVN|GB|1993|Olimpija Ljubljana;Benfica;Rio Ave;Atlético Madrid|Oblak
Dominik Szoboszlai|HUN|MIL|2000|Liefering;Salzbourg;RB Leipzig;Liverpool|Szoboszlai
Khvicha Kvaratskhelia|GEO|AIL|2001|Dinamo Tbilisi;Rustavi;Lokomotiv Moscou;Rubin Kazan;Dinamo Batoumi;Napoli;Paris SG|Kvaratskhelia;Kvara
Son Heung-min|KOR|AIL|1992|Hambourg;Bayer Leverkusen;Tottenham;Los Angeles FC|Son;Heung-min Son
Park Ji-sung|KOR|MIL|1981|Kyoto Sanga;PSV Eindhoven;Manchester United;Queens Park Rangers;PSV Eindhoven|Park;Ji-sung Park
Hidetoshi Nakata|JPN|MIL|1977|Bellmare Hiratsuka;Pérouse;AS Roma;Parme;Bologne;Fiorentina;Bolton|Nakata
Shinji Kagawa|JPN|MIL|1989|Cerezo Osaka;Borussia Dortmund;Manchester United;Borussia Dortmund;Beşiktaş;Real Saragosse;PAOK;Sint-Truiden;Cerezo Osaka|Kagawa
Takefusa Kubo|JPN|AIL|2001|FC Tokyo;Real Madrid;Mallorca;Villarreal;Getafe;Mallorca;Real Sociedad|Kubo
Christian Pulisic|USA|AIL|1998|Borussia Dortmund;Chelsea;AC Milan|Pulisic
Hugo Sánchez|MEX|ATT|1958|Pumas;Atlético Madrid;Real Madrid;América;Rayo Vallecano|Hugo Sanchez
Javier Hernández|MEX|ATT|1988|Chivas;Manchester United;Real Madrid;Bayer Leverkusen;West Ham;Séville FC;LA Galaxy;Chivas|Chicharito;Javier Hernandez
Rafael Márquez|MEX|DEF|1979|Atlas;Monaco;FC Barcelone;New York Red Bulls;Club León;Hellas Vérone;Atlas|Marquez;Rafa Márquez
Keylor Navas|CRC|GB|1986|Saprissa;Albacete;Levante;Real Madrid;Paris SG;Nottingham Forest;Newell's Old Boys;Pumas|Navas
Alphonso Davies|CAN|DEF|2000|Vancouver;Bayern Munich|Davies
Jonathan David|CAN|ATT|2000|Gand;Lille;Juventus|David
`;

// ---- LE 11 : titre|équipe|adversaire|score|date|joueur 1;joueur 2;… (alias entre parenthèses, ex. "Pelé(Abedi Pelé)")
const XIS_RAW=`
Finale de la Coupe du monde 1998|France|Brésil|3-0|12 juillet 1998, Saint-Denis|Fabien Barthez;Lilian Thuram;Frank Leboeuf;Marcel Desailly;Bixente Lizarazu;Christian Karembeu;Didier Deschamps;Emmanuel Petit;Youri Djorkaeff;Zinédine Zidane;Stéphane Guivarc'h
Finale de la Coupe du monde 2002|Brésil|Allemagne|2-0|30 juin 2002, Yokohama|Marcos;Lúcio;Edmílson;Roque Júnior;Cafu;Kléberson;Gilberto Silva;Roberto Carlos;Ronaldinho;Rivaldo;Ronaldo
Finale de la Coupe du monde 2006|Italie|France|1-1 (5-3 t.a.b.)|9 juillet 2006, Berlin|Gianluigi Buffon;Gianluca Zambrotta;Fabio Cannavaro;Marco Materazzi;Fabio Grosso;Gennaro Gattuso;Andrea Pirlo;Simone Perrotta;Mauro Camoranesi;Francesco Totti;Luca Toni
Finale de la Coupe du monde 2006|France|Italie|1-1 (3-5 t.a.b.)|9 juillet 2006, Berlin|Fabien Barthez;Willy Sagnol;Lilian Thuram;William Gallas;Éric Abidal;Patrick Vieira;Claude Makélélé;Franck Ribéry;Zinédine Zidane;Florent Malouda;Thierry Henry
Finale de la Coupe du monde 2010|Espagne|Pays-Bas|1-0 a.p.|11 juillet 2010, Johannesburg|Iker Casillas;Sergio Ramos;Gerard Piqué;Carles Puyol;Joan Capdevila;Sergio Busquets;Xabi Alonso;Xavi;Andrés Iniesta;Pedro;David Villa
Finale de la Coupe du monde 2014|Allemagne|Argentine|1-0 a.p.|13 juillet 2014, Rio de Janeiro|Manuel Neuer;Philipp Lahm;Jérôme Boateng;Mats Hummels;Benedikt Höwedes;Bastian Schweinsteiger;Christoph Kramer;Thomas Müller;Toni Kroos;Mesut Özil;Miroslav Klose
Finale de la Coupe du monde 2018|France|Croatie|4-2|15 juillet 2018, Moscou|Hugo Lloris;Benjamin Pavard;Raphaël Varane;Samuel Umtiti;Lucas Hernandez;Paul Pogba;N'Golo Kanté;Blaise Matuidi;Antoine Griezmann;Kylian Mbappé;Olivier Giroud
Finale de la Coupe du monde 2022|Argentine|France|3-3 (4-2 t.a.b.)|18 décembre 2022, Lusail|Emiliano Martínez;Nahuel Molina;Cristian Romero;Nicolás Otamendi;Nicolás Tagliafico;Rodrigo De Paul;Enzo Fernández;Alexis Mac Allister;Ángel Di María;Lionel Messi;Julián Álvarez
Finale de la Coupe du monde 2022|France|Argentine|3-3 (2-4 t.a.b.)|18 décembre 2022, Lusail|Hugo Lloris;Jules Koundé;Raphaël Varane;Dayot Upamecano;Theo Hernandez;Aurélien Tchouaméni;Adrien Rabiot;Ousmane Dembélé;Antoine Griezmann;Kylian Mbappé;Olivier Giroud
Finale de la Coupe du monde 1970|Brésil|Italie|4-1|21 juin 1970, Mexico|Félix;Carlos Alberto;Brito;Piazza;Everaldo;Clodoaldo;Gérson;Jairzinho;Tostão;Pelé;Rivellino
Finale de la Coupe du monde 1986|Argentine|RFA|3-2|29 juin 1986, Mexico|Nery Pumpido;José Luis Cuciuffo;José Luis Brown;Oscar Ruggeri;Julio Olarticoechea;Ricardo Giusti;Sergio Batista;Héctor Enrique;Jorge Burruchaga;Diego Maradona;Jorge Valdano
Finale de l'Euro 2000|France|Italie|2-1 (but en or)|2 juillet 2000, Rotterdam|Fabien Barthez;Lilian Thuram;Laurent Blanc;Marcel Desailly;Bixente Lizarazu;Patrick Vieira;Didier Deschamps;Youri Djorkaeff;Zinédine Zidane;Christophe Dugarry;Thierry Henry
Finale de l'Euro 2016|Portugal|France|1-0 a.p.|10 juillet 2016, Saint-Denis|Rui Patrício;Cédric Soares;Pepe;José Fonte;Raphaël Guerreiro;William Carvalho;Renato Sanches;Adrien Silva;João Mário;Nani;Cristiano Ronaldo
Finale de l'Euro 2020|Italie|Angleterre|1-1 (3-2 t.a.b.)|11 juillet 2021, Londres|Gianluigi Donnarumma;Giovanni Di Lorenzo;Leonardo Bonucci;Giorgio Chiellini;Emerson;Nicolò Barella;Jorginho;Marco Verratti;Federico Chiesa;Ciro Immobile;Lorenzo Insigne
Finale de l'Euro 2024|Espagne|Angleterre|2-1|14 juillet 2024, Berlin|Unai Simón;Dani Carvajal;Robin Le Normand;Aymeric Laporte;Marc Cucurella;Rodri;Fabián Ruiz;Lamine Yamal;Dani Olmo;Nico Williams;Álvaro Morata
Finale de la CAN 2019|Algérie|Sénégal|1-0|19 juillet 2019, Le Caire|Raïs M'Bolhi;Mehdi Zeffane;Aïssa Mandi;Djamel Benlamri;Ramy Bensebaini;Adlène Guedioura;Ismaël Bennacer;Sofiane Feghouli;Riyad Mahrez;Baghdad Bounedjah;Youcef Belaïli
Finale de la Ligue des champions 1993|Marseille|AC Milan|1-0|26 mai 1993, Munich|Fabien Barthez;Jocelyn Angloma;Basile Boli;Marcel Desailly;Éric Di Meco;Jean-Jacques Eydelie;Franck Sauzée;Didier Deschamps;Abedi Pelé;Rudi Völler;Alen Bokšić
Finale de la Ligue des champions 1999|Manchester United|Bayern Munich|2-1|26 mai 1999, Barcelone|Peter Schmeichel;Gary Neville;Ronny Johnsen;Jaap Stam;Denis Irwin;David Beckham;Nicky Butt;Ryan Giggs;Jesper Blomqvist;Dwight Yorke;Andy Cole
Finale de la Ligue des champions 2005|Liverpool|AC Milan|3-3 (3-2 t.a.b.)|25 mai 2005, Istanbul|Jerzy Dudek;Steve Finnan;Jamie Carragher;Sami Hyypiä;Djimi Traoré;Xabi Alonso;Steven Gerrard;John Arne Riise;Luis García;Harry Kewell;Milan Baroš
Finale de la Ligue des champions 2005|AC Milan|Liverpool|3-3 (2-3 t.a.b.)|25 mai 2005, Istanbul|Dida;Cafu;Alessandro Nesta;Jaap Stam;Paolo Maldini;Gennaro Gattuso;Andrea Pirlo;Clarence Seedorf;Kaká;Andriy Shevchenko;Hernán Crespo
Finale de la Ligue des champions 2011|FC Barcelone|Manchester United|3-1|28 mai 2011, Londres|Víctor Valdés;Dani Alves;Gerard Piqué;Javier Mascherano;Éric Abidal;Sergio Busquets;Xavi;Andrés Iniesta;Pedro;Lionel Messi;David Villa
Finale de la Ligue des champions 2012|Chelsea|Bayern Munich|1-1 (4-3 t.a.b.)|19 mai 2012, Munich|Petr Čech;José Bosingwa;Gary Cahill;David Luiz;Ashley Cole;John Obi Mikel;Frank Lampard;Salomon Kalou;Juan Mata;Ryan Bertrand;Didier Drogba
Finale de la Ligue des champions 2013|Bayern Munich|Borussia Dortmund|2-1|25 mai 2013, Londres|Manuel Neuer;Philipp Lahm;Jérôme Boateng;Dante;David Alaba;Javi Martínez;Bastian Schweinsteiger;Arjen Robben;Thomas Müller;Franck Ribéry;Mario Mandžukić
Finale de la Ligue des champions 2014|Real Madrid|Atlético Madrid|4-1 a.p.|24 mai 2014, Lisbonne|Iker Casillas;Dani Carvajal;Raphaël Varane;Sergio Ramos;Fábio Coentrão;Luka Modrić;Sami Khedira;Ángel Di María;Gareth Bale;Karim Benzema;Cristiano Ronaldo
Finale de la Ligue des champions 2022|Real Madrid|Liverpool|1-0|28 mai 2022, Saint-Denis|Thibaut Courtois;Dani Carvajal;Éder Militão;David Alaba;Ferland Mendy;Luka Modrić;Casemiro;Toni Kroos;Federico Valverde;Karim Benzema;Vinícius Júnior
Finale de la Ligue des champions 2023|Manchester City|Inter Milan|1-0|10 juin 2023, Istanbul|Ederson;Manuel Akanji;Rúben Dias;John Stones;Nathan Aké;Rodri;Bernardo Silva;Kevin De Bruyne;İlkay Gündoğan;Jack Grealish;Erling Haaland
Finale de la Ligue des champions 2025|Paris SG|Inter Milan|5-0|31 mai 2025, Munich|Gianluigi Donnarumma;Achraf Hakimi;Marquinhos;Willian Pacho;Nuno Mendes;Vitinha;João Neves;Fabián Ruiz;Désiré Doué;Ousmane Dembélé;Khvicha Kvaratskhelia
`;

// ---- TOP LISTES : titre|unité|date de référence|élément 1;élément 2;…  (élément = nom~détail)
const TOPS_RAW=`
Les 10 transferts les plus chers de l'histoire|M€|septembre 2025|Neymar~222 M€ · FC Barcelone → Paris SG, 2017;Kylian Mbappé~180 M€ · Monaco → Paris SG, 2018;Alexander Isak~≈145 M€ · Newcastle → Liverpool, 2025;Philippe Coutinho~135 M€ · Liverpool → FC Barcelone, 2018;João Félix~127 M€ · Benfica → Atlético Madrid, 2019;Florian Wirtz~≈125 M€ · Leverkusen → Liverpool, 2025;Enzo Fernández~121 M€ · Benfica → Chelsea, 2023;Antoine Griezmann~120 M€ · Atlético Madrid → FC Barcelone, 2019;Jack Grealish~117 M€ · Aston Villa → Manchester City, 2021;Cristiano Ronaldo~117 M€ · Real Madrid → Juventus, 2018
Les joueurs avec au moins 2 Ballons d'Or|Ballons d'Or|2025|Lionel Messi~8;Cristiano Ronaldo~5;Michel Platini~3;Johan Cruyff~3;Marco van Basten~3;Alfredo Di Stéfano~2;Franz Beckenbauer~2;Kevin Keegan~2;Karl-Heinz Rummenigge~2;Ronaldo~2 (Ronaldo Nazário);Paolo Rossi~2
Les meilleurs buteurs de l'histoire de la Coupe du monde (11 buts et plus)|buts|2022|Miroslav Klose~16 buts;Ronaldo~15 buts (Ronaldo Nazário);Gerd Müller~14 buts;Just Fontaine~13 buts;Lionel Messi~13 buts;Pelé~12 buts;Kylian Mbappé~12 buts;Sándor Kocsis~11 buts;Jürgen Klinsmann~11 buts
Les 10 meilleurs buteurs de l'histoire de la Ligue des champions|buts|juin 2025|Cristiano Ronaldo~140 buts;Lionel Messi~129 buts;Robert Lewandowski~≈105 buts;Karim Benzema~90 buts;Raúl~71 buts;Kylian Mbappé~≈60 buts;Thomas Müller~57 buts;Ruud van Nistelrooy~56 buts;Erling Haaland~≈50 buts;Thierry Henry~50 buts
Les 10 meilleurs buteurs de l'équipe de France|buts|2025|Olivier Giroud~57 buts;Kylian Mbappé~≈52 buts (en activité);Thierry Henry~51 buts;Antoine Griezmann~44 buts;Michel Platini~41 buts;Karim Benzema~37 buts;David Trezeguet~34 buts;Zinédine Zidane~31 buts;Just Fontaine~30 buts;Jean-Pierre Papin~30 buts
Les vainqueurs du Ballon d'Or africain depuis 2010|joueurs|2025|Samuel Eto'o~2010;Yaya Touré~2011, 2012, 2013, 2014;Pierre-Emerick Aubameyang~2015;Riyad Mahrez~2016;Mohamed Salah~2017, 2018;Sadio Mané~2019, 2022;Victor Osimhen~2023;Ademola Lookman~2024;Achraf Hakimi~2025
Les pays champions du monde|titres|2022|Brésil~5 titres (1958, 1962, 1970, 1994, 2002);Allemagne~4 titres (1954, 1974, 1990, 2014);Italie~4 titres (1934, 1938, 1982, 2006);Argentine~3 titres (1978, 1986, 2022);France~2 titres (1998, 2018);Uruguay~2 titres (1930, 1950);Angleterre~1 titre (1966);Espagne~1 titre (2010)
Les clubs avec au moins 2 Ligues des champions|titres|2025|Real Madrid~15 titres;AC Milan~7 titres;Bayern Munich~6 titres;Liverpool~6 titres;FC Barcelone~5 titres;Ajax~4 titres;Inter Milan~3 titres;Manchester United~3 titres;Juventus~2 titres;Benfica~2 titres;Chelsea~2 titres;Nottingham Forest~2 titres;FC Porto~2 titres
Les 10 meilleurs buteurs de l'histoire de la Premier League|buts|2025|Alan Shearer~260 buts;Harry Kane~213 buts;Wayne Rooney~208 buts;Mohamed Salah~≈188 buts (en activité);Andy Cole~187 buts;Sergio Agüero~184 buts;Frank Lampard~177 buts;Thierry Henry~175 buts;Robbie Fowler~163 buts;Jermain Defoe~162 buts
Les 10 meilleurs buteurs de l'histoire de la Liga|buts|2025|Lionel Messi~474 buts;Cristiano Ronaldo~311 buts;Telmo Zarra~251 buts;Karim Benzema~238 buts;Hugo Sánchez~234 buts;Raúl~228 buts;Alfredo Di Stéfano~227 buts;César Rodríguez~223 buts;Quini~219 buts;Pahiño~210 buts
Les meilleurs buteurs de l'histoire de la Ligue 1 (187 buts et plus)|buts|2025|Delio Onnis~299 buts;Bernard Lacombe~255 buts;Hervé Revelli~216 buts;Roger Courtois~210 buts;Thadée Cisowski~206 buts;Roger Piantoni~203 buts;Kylian Mbappé~191 buts;Joseph Ujlaki~190 buts;Fleury Di Nallo~187 buts
Les 10 meilleurs buteurs de l'histoire de la Serie A|buts|2025|Silvio Piola~274 buts;Francesco Totti~250 buts;Gunnar Nordahl~225 buts;José Altafini~216 buts;Giuseppe Meazza~216 buts;Antonio Di Natale~209 buts;Roberto Baggio~205 buts;Ciro Immobile~201 buts;Alessandro Del Piero~188 buts;Giuseppe Signori~188 buts
Les 10 meilleurs buteurs de l'histoire de la Bundesliga|buts|2025|Gerd Müller~365 buts;Robert Lewandowski~312 buts;Klaus Fischer~268 buts;Jupp Heynckes~220 buts;Manfred Burgsmüller~213 buts;Claudio Pizarro~197 buts;Ulf Kirsten~182 buts;Stefan Kuntz~179 buts;Dieter Müller~177 buts;Klaus Allofs~177 buts
Les pays vainqueurs de l'Euro|titres|2024|Espagne~4 titres (1964, 2008, 2012, 2024);Allemagne~3 titres (1972, 1980, 1996);Italie~2 titres (1968, 2020);France~2 titres (1984, 2000);URSS~1 titre (1960);Tchécoslovaquie~1 titre (1976);Pays-Bas~1 titre (1988);Danemark~1 titre (1992);Grèce~1 titre (2004);Portugal~1 titre (2016)
Les pays vainqueurs de la CAN depuis 2000|titres|2024|Cameroun~2000, 2002, 2017;Tunisie~2004;Égypte~2006, 2008, 2010;Zambie~2012;Nigeria~2013;Côte d'Ivoire~2015, 2023;Algérie~2019;Sénégal~2021
Les vainqueurs du Ballon d'Or depuis 2010|joueurs|2025|Lionel Messi~2010, 2011, 2012, 2015, 2019, 2021, 2023;Cristiano Ronaldo~2013, 2014, 2016, 2017;Luka Modrić~2018;Karim Benzema~2022;Rodri~2024;Ousmane Dembélé~2025
Les clubs champions de France depuis 2000|titres|2025|Monaco~2000, 2017;Nantes~2001;Lyon~2002 à 2008 (7 titres);Bordeaux~2009;Marseille~2010;Lille~2011, 2021;Montpellier~2012;Paris SG~2013 à 2016, 2018 à 2020, 2022 à 2025
Les clubs vainqueurs de la Ligue des champions depuis 2010|titres|2025|Inter Milan~2010;FC Barcelone~2011, 2015;Chelsea~2012, 2021;Bayern Munich~2013, 2020;Real Madrid~2014, 2016, 2017, 2018, 2022, 2024;Liverpool~2019;Manchester City~2023;Paris SG~2025
`;

// Alias de pays pour les listes (plusieurs façons d'écrire)
const LIST_ALIASES={"Brésil":["Bresil","Brazil"],"Allemagne":["RFA","Germany","Deutschland"],"Angleterre":["England"],"Espagne":["Spain","España"],"Pays-Bas":["Hollande","Holland","Netherlands"],"Côte d'Ivoire":["Cote d'Ivoire","Côte d Ivoire","Ivory Coast"],"Égypte":["Egypte","Egypt"],"Sénégal":["Senegal"],"Algérie":["Algerie","Algeria"],"Tchécoslovaquie":["Tchecoslovaquie"],"Grèce":["Grece","Greece"],"Paris SG":["PSG","Paris Saint-Germain","Paris"],"FC Barcelone":["Barcelone","Barcelona","Barça","Barca"],"Inter Milan":["Inter"],"AC Milan":["Milan","Milan AC"],"Bayern Munich":["Bayern"],"Manchester United":["Man United","Man Utd","United"],"Manchester City":["Man City","City"],"Real Madrid":["Real"],"Juventus":["Juve"],"FC Porto":["Porto"],"Nottingham Forest":["Nottingham","Forest"],"Lyon":["OL","Olympique Lyonnais"],"Marseille":["OM","Olympique de Marseille"],"Lille":["LOSC"],"Monaco":["AS Monaco"],"Nantes":["FC Nantes"],"Bordeaux":["Girondins"],"Montpellier":["MHSC"],"Ronaldo":["Ronaldo Nazário","Ronaldo Nazario","R9","Ronaldo Nazario de Lima"],"Cristiano Ronaldo":["Cristiano","CR7"],"Raúl":["Raul","Raúl González","Raul Gonzalez"],"Hugo Sánchez":["Hugo Sanchez"],"Alfredo Di Stéfano":["Di Stefano","Di Stéfano"],"César Rodríguez":["Cesar","César","Cesar Rodriguez"],"Pelé":["Pele"],"Thomas Müller":["Muller","Müller","Thomas Muller"],"Gerd Müller":["Gerd Muller"],"Dieter Müller":["Dieter Muller"],"Ruud van Nistelrooy":["Van Nistelrooy","Nistelrooy"],"Robert Lewandowski":["Lewandowski","Lewy"],"Erling Haaland":["Haaland"],"Kylian Mbappé":["Mbappe","Mbappé"],"Lionel Messi":["Messi","Leo Messi"],"Johan Cruyff":["Cruyff","Cruijff"],"Marco van Basten":["Van Basten"],"Michel Platini":["Platini"],"Franz Beckenbauer":["Beckenbauer"],"Kevin Keegan":["Keegan"],"Karl-Heinz Rummenigge":["Rummenigge"],"Paolo Rossi":["Rossi"],"Miroslav Klose":["Klose"],"Just Fontaine":["Fontaine"],"Sándor Kocsis":["Kocsis","Sandor Kocsis"],"Jürgen Klinsmann":["Klinsmann"],"Karim Benzema":["Benzema"],"Thierry Henry":["Henry"],"Olivier Giroud":["Giroud"],"Antoine Griezmann":["Griezmann"],"David Trezeguet":["Trezeguet"],"Zinédine Zidane":["Zidane","Zizou"],"Jean-Pierre Papin":["Papin","JPP"],"Samuel Eto'o":["Eto'o","Etoo","Eto o"],"Yaya Touré":["Yaya Toure","Toure","Touré"],"Pierre-Emerick Aubameyang":["Aubameyang"],"Riyad Mahrez":["Mahrez"],"Mohamed Salah":["Salah","Mo Salah"],"Sadio Mané":["Mane","Mané","Sadio Mane"],"Victor Osimhen":["Osimhen"],"Ademola Lookman":["Lookman"],"Achraf Hakimi":["Hakimi"],"Alan Shearer":["Shearer"],"Harry Kane":["Kane"],"Wayne Rooney":["Rooney"],"Andy Cole":["Andrew Cole","Cole"],"Sergio Agüero":["Aguero","Agüero","Kun"],"Frank Lampard":["Lampard"],"Robbie Fowler":["Fowler"],"Jermain Defoe":["Defoe"],"Telmo Zarra":["Zarra"],"Quini":["Enrique Castro"],"Pahiño":["Pahino"],"Delio Onnis":["Onnis"],"Bernard Lacombe":["Lacombe"],"Hervé Revelli":["Revelli","Herve Revelli"],"Roger Courtois":["Courtois"],"Thadée Cisowski":["Cisowski","Thadee Cisowski"],"Roger Piantoni":["Piantoni"],"Joseph Ujlaki":["Ujlaki"],"Fleury Di Nallo":["Di Nallo"],"Silvio Piola":["Piola"],"Francesco Totti":["Totti"],"Gunnar Nordahl":["Nordahl"],"José Altafini":["Altafini","Jose Altafini"],"Giuseppe Meazza":["Meazza"],"Antonio Di Natale":["Di Natale"],"Roberto Baggio":["Baggio"],"Ciro Immobile":["Immobile"],"Alessandro Del Piero":["Del Piero"],"Giuseppe Signori":["Signori","Beppe Signori"],"Klaus Fischer":["Fischer"],"Jupp Heynckes":["Heynckes"],"Manfred Burgsmüller":["Burgsmuller","Burgsmüller"],"Claudio Pizarro":["Pizarro"],"Ulf Kirsten":["Kirsten"],"Stefan Kuntz":["Kuntz"],"Klaus Allofs":["Allofs"],"Luka Modrić":["Modric","Modrić"],"Rodri":["Rodrigo Hernández","Rodrigo Hernandez"],"Ousmane Dembélé":["Dembele","Dembélé"],"Neymar":["Neymar Jr","Neymar Júnior"],"Alexander Isak":["Isak"],"Philippe Coutinho":["Coutinho"],"João Félix":["Joao Felix","Félix","Felix"],"Florian Wirtz":["Wirtz"],"Enzo Fernández":["Enzo Fernandez","Enzo"],"Jack Grealish":["Grealish"]};
