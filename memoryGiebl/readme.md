Zeilen 1-11 definieren globale variablen die während dem Spielablauf benötigt werden.

Zeilen 13-21 definieren Interfaces die für Karten und Auswahlmöglichkeiten für User verwendet werden.

Das Cards Array verwendet das Interface card und definiert alle möglichen Karten die zur Verfügung stehen.

Das playingCards Array verwendet das Interface card und beinhaltet alle Karten mit denen tatsächlich gespielt wird. Die Anzahl dieser Karten wird vom User am Anfang des Spiels ausgewählt.

Das Array cntOptions verwendet das Interface cntChoice und beinhaltet alle Auswahlmöglichkeiten, die dem User am Anfang zur Verfügung stehen (1-10 Paare).

Die Funktion cardnumberInput gibt dem User die Wahl mit wie vielen Karten er spielen möchte, und fügt die entsprechenden Karten in playingCards ein. daraufhin werden diese Karten gemischt und ausgegeben.

Wenn eine Karte geclicked wird, wird das Parent Element, flipCard, ermittelt, da dieses für die css Animation benötigt wird.

Wenn eine karte "gültig" ist, wird die class flipped hinzugefügt, sobald zwei aufgedeckt sind wird das gezeigte Bild der beiden ermittelt und an chkImg übergeben.

In chkImg wird geprüft ob es sich um das selbe Bild handelt, wenn nein werden die Karten wieder umgedreht und der nächste Spieler ist an der Reihe, wenn ja wird bei beidem die class matched hinzugefügt und der entsprechende Spieler erhält einen Punkt.

Falls alle Karten gefunden wurden gibt es eine Ausgabe wer gewonnen hat und es wird ein Button gezeigt, mit dem das Spiel neu gestartet werden kann.