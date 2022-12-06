# 🔱LT-Bot 
### Ceci est un bot pour la LT qui feras un peux tout(modération,fun,ect)
# ✨Bot ressource
## 🔑Database
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
## 💻Langage de programmation
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
## 📚Librairie utilisée
* [**Node-fetch**](https://www.npmjs.com/package/node-fetch/)
* [**Discord.js**](https://www.npmjs.com/package/discord.js)
* [**ASCII-TABLE**](https://www.npmjs.com/package/ascii-table)
* [**Mongoose**](https://www.npmjs.com/package/mongoose)

## 🛠Comment configuré le bot?
### Deux fichiers a besoins d'être remplie
```js
./src/structures/config/client.js
module.exports = {
    token:"Le token du bot",//obligé
    mongoURL:"url de mongoDB",//obligé
    owner:"Votre id de compte",//obligé
}

./src/structures/config/embed.js
module.exports = {
    'color': 'html couleur',//obligé
    'footer': 'message du footer',//obligé
    thumbnailActive: false,// true ou false et le est obligé
    'thumbnail': 'lien' // si thumbnailActive  est true
}
```
## Comment lancer le bot?
### Allez dans le dossier launch et lancer le fichier install (.bat windows, .sh linux)
### Puis lancer le fichier start (.bat windows, .sh linux)
### Pour windows si avez cette erreur
```
pm2: Unable to load C:\Users\AppData\Roaming\npm pm2.ps1, as script execution is disabled on this system. For more information, see about_Execution_Policies at 
https://go.microsoft.com/fwlink/?LinkID=135170.
At Line:1: 1
+pm2 start main.js
+~~~
    + CategoryInfo   : Security error: (:) [], PSSecurityException
    + FullyQualifiedErrorId: UnauthorizedAccess
```
### Lancer un powershell en administrateur et executé cette command
```Set-ExecutionPolicy RemoteSigned```
# 🏴 Fin du readme
### Le bot a été fait avec ❤
### Contact: PsychedelicsEyes.php aka مخدر ال#6978