/* VARIABLEN
** In Variablen können Werte zur Laufzeit gespeichert werden.
** Eine let Variable exisitert nur lokal, also in den Klammern in denen sie zuerst definiert wurde.
** Eine var Variable existiert global und kann beliebig häufig verändert werden (genauso wie let);
** Eine const Variable wird einmal beschrieben (man sagt initiiert) und kann danach nicht mehr verändert werden.
*/
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //speichert das genutzte Alphabet
let status = "set"; //speichert den Status der Anwendung
let offset = 0; //speichert den aktuell gewählten Versatz
let letter = 0; //speichert den aktuell gewählten Buchstaben (in Form eines Index, nicht in Form eines Characters)

/* ONLOAD
** Bestimmte Operationen werden bei Prorammstart ausgeführt.
** Diese werden außerhalb jedweder Klammern geschrieben und dann sofort ausgeführt, wenn das Programm startet.
*/
radio.setGroup(666); //setzt die Gruppe für die Funkkommunikation
screenRefresh(); //ruft einmal die Render Funktion auf um den aktuellen Zustand des Programms zu repräsentieren
radio.sendString("start"); //sendet einen String, nur um im Simulator das zweite Gerät anzuzeigen

/* INPUTS
** Die Interaktion mit einem Programm geschieht durch Ereignisse.
** Ein bestimmtes Ereignis führt zu einer bestimmten Interaktion mit dem Programm.
** Wir verwenden aktuell drei Ereignisse: Knöpfe, Gesten und Funk.
*/
input.onButtonPressed(Button.A, function () { //wenn der A Knopf gedrückt wird
    if (status == "set") { //wenn aktuell der Versatz gewählt wird
        radio.sendNumber(offset); //versende den aktuell gewählten Offset
        status = "crypt"; //beende das Wählen des Versatzes und wechsele in den Schlüsselmodus
    }
    else if (status == "crypt") { //wenn aktuell geschlüsselt wird
        encrypt(); //rufe die encrypt Funktion auf
    }
    screenRefresh(); //nach jeder Eingabe wird der Screen aktualisiert
})
input.onButtonPressed(Button.B, function () { //wenn der B Knopf gedrückt wird
    if (status == "set") { //wenn aktuell der Versatz gewählt wird
        status = "crypt"; //beende das Wählen des Versatzes und wechsele in den Schlüsselmodus
    }
    else if (status == "crypt") { //wenn aktuell geschlüsselt wird
        decrypt(); //rufe die decrypt Funktion auf
    }
    screenRefresh(); //nach jeder Eingabe wird der Screen aktualisiert
})
input.onGesture(Gesture.TiltLeft, function () {
    if (status == "set") { //wenn aktuell der Versatz gewählt wird
        changeOffset(-1); // rufe die changeOffset Funktion in negative Richtung auf
    }
    else if (status == "crypt") { //wenn aktuell geschlüsselt wird
        changeLetter(-1); // rufe die changeLetter Funktion in negative Richtung auf
    }
    screenRefresh(); //nach jeder Eingabe wird der Screen aktualisiert
})
input.onGesture(Gesture.TiltRight, function () {
    if (status == "set") { //wenn aktuell der Versatz gewählt wird
        changeOffset(1); // rufe die changeLetter Funktion in positive Richtung auf
    }
    else if (status == "crypt") { //wenn aktuell geschlüsselt wird
        changeLetter(1); // rufe die changeLetter Funktion in positive Richtung auf
    }
    screenRefresh(); //nach jeder Eingabe wird der Screen aktualisiert
})
radio.onReceivedNumber(function (receivedNumber: number) { //wenn eine Nummer über Funk erhalten wird
    offset = receivedNumber; //setze den offset Wert auf die erhaltene Nummer
    screenRefresh(); //ruft screenRefresh auf um die neue Nummer anzuzeigen
    status = "crypt"; //beende das Wählen des Versatzes und wechsele in den Schlüsselmodus
})

/* FUNKTIONEN
** FUnktionen bündeln eine Reihe von Programmabläufen um immer wieder verwendet zu werden.
** In den Parametern einer Funktion können Werte mit Variablen übergeben werden.
** Funktionen können ansonsten auf alle globaleb sowie innerhalb ihres Aufrufs deffinierten lokalen Variablen zugreifen.
** Eine Funktion ruft bei Aufruf alle innerhalb der Klammern definierten Operationen von oben nach unten auf.
*/
function screenRefresh() { //visualisiert den aktuellen Programmzustand auf dem Bildschirm
    if (status == "set") { //wenn aktuell der Versatz gewählt wird
        basic.showNumber(offset); //zeige den aktuellen Versatz an
    }
    else { //wenn aktuell geschlüsselt wird
        basic.showString(alphabet.charAt(letter)); //zeige den aktuellen Buchstaben an. .charAt() gibt den Buchstaben im Wort an einer bestimmten Stelle zurück
    }
}
function changeLetter(by: number) { //ändert die letter variable um den Wert by
    letter = (alphabet.length + letter + by) % alphabet.length;  //setzt letter auf einen neuen Wert. % gibt den Rest einer Division zurück, also z.B. 28 % 26 = 2
}
function changeOffset(by: number) { //ändert die offset Variabke um den Wert by
    offset = offset + by; //setzt offset auf einen neuen Wert
    if (offset < 0) { //falls offset unter 0 fällt (was ein für uns ungültiger Wert wäre)
        offset = 0; //setze offset zurück auf 0
    }
    else if (offset > 9) { //falls offset über 9 fällt (was ein für uns ungültiger Wert wäre)
        offset = 9; //setze offset zurück auf 9
    }
}
function returnOffset(dir: number) { //gibt einen neuen Wert für letter zurück, nachdem der aktuelle mit dem Wert für offset verrechnet wurde
    let basis = alphabet.length; //damit keine negativen Werte entstehen (also z.B. 3 - 5 = -2) rechnen wir auf einer Basis
    let summand = dir * offset; //der Summand entspricht dem aktuellen offset Wert multipliziert mit der Richtung dir um entweder zu addieren oder zu subtrahieren
    /* Das Ergebnis erhalten wir aus folgender Rechnung
    ** Auf den aktuellen Wert von Letter wird der Summand addiert oder subtrahiert.
    ** Dieser Wert wird dann auf die Basis addiert.
    ** Um nun immer einen Wert innerhalb der 26 Zeichen im Alphabet zu erhalten modifizieren wir das Ergebnis dann mit der Basis.
    */
    let ergebnis = (basis + (letter + summand)) % basis;
    return ergebnis;
}
function decrypt() { //ruft returnOffset in die positive Richtung auf
    letter = returnOffset(1); //"
}
function encrypt() { //ruft returnOffset in die negative Richtung auf
    letter = returnOffset(-1); //"
}
