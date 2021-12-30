const voice = require('@discordjs/voice')

const Discord = require('discord.js')

const button1 = new Discord.MessageButton()
.setCustomId("lofi1")
.setLabel("1")
.setStyle("PRIMARY")
const button2 = new Discord.MessageButton()
.setCustomId("lofi2")
.setLabel("2")
.setStyle("PRIMARY")
const button3 = new Discord.MessageButton()
.setCustomId("lofi3")
.setLabel("3")
.setStyle("PRIMARY")
const button4 = new Discord.MessageButton()
.setCustomId("lofi4")
.setLabel("4")
.setStyle("PRIMARY")
const row = new Discord.MessageActionRow()
.addComponents([button1 , button2 , button3 , button4])
module.exports = {
    name: "lofi",

    description: "Plays Lofi",

        options: [
        {
            name:"filter",
            description: "add Filters to Audio",
            required: false,
            type: Discord.Constants.ApplicationCommandOptionTypes.STRING
        }
    ],
    run:async function(i = interaction, client, filter) {
        let user = await i.member.fetch();

        let channel = await user.voice.channel;
        if(!channel) return i.reply({content: "Join A VC First"});

        const embed = new Discord.MessageEmbed()
        .setTitle("Lo-Fi")
        .setDescription("Choose A Lo-Fi Station")
        .addField("1) Normal Lo-Fi", "A Lo-Fi Station Which Plays Simple Lo-Fi")
        .addField("2) Hindi Lo-Fi", "A Hindi Lo-Fi Station Which Plays Hindi Songs But In Lo-Fi")
        .addField("3) Live Lo-Fi", "Live Lo-Fi Station Which Plays Lo-Fi 24/7")
        .addField("4) Study Lo-Fi", "Study Lo-Fi Station Helps You Study And Relax")
        .setThumbnail("https://avatars.githubusercontent.com/u/96626911?s=200&v=4")
        .addField("More Stations?", "Coming Soon")
        .setFooter("Made By Agent Hacker#0477")
        .setColor("#FF10F0")
        i.reply({embeds: [embed], components: [row]}).catch(console.warn)
        let filters = [
            'apulsator=hz=0.08', //8D
             'aresample=48000,asetrate=48000*0.8', //vaporwave
             'aresample=48000,asetrate=48000*1.25',//nightcore
             'aphaser=in_gain=0.4',//phaser
             'tremolo', //tremolo
             'vibrato=f=6.5',//vibrato
             'surround',//surrounding
             'apulsator=hz=1',//pulsator
            'asubboost',//subboost
         ];
         if(!filter) filter = "bass=g=10,dynaudnorm=f=200"
    
        else if(filter.toLowerCase() == "8d") filter = filters[0]
    
        else if(filter.toLowerCase() == "vaporwave") filter = filters[1]
    
        else if(filter.toLowerCase() == "nightcore") filter = filters[2]
    
        else if(filter.toLowerCase() == "phaser") filter = filters[3]
    
        else if(filter.toLowerCase() == "tremolo") filter = filters[4]
    
        else if(filter.toLowerCase() == "vibrato") filter = filters[5]
    
        else if(filter.toLowerCase() == "surround") filter = filters[6]
    
        else if(filter.toLowerCase() == "pulsator") filter = filters[7]
    
        else if(filter.toLowerCase() == "subboost") filter = filters[8]
    
        else filter = "bass=g=10,dynaudnorm=f=200" 
        db.set(`filter`, filter)
    }
}
