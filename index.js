const Discord = require('discord.js')

const client = new Discord.Client({intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_VOICE_STATES]})

const db = new Map()

module.exports = {db}
const fs = require('fs')

const voice = require('@discordjs/voice')

const config = require('./config')

client.on("ready", async() =>{

console.log("Ready")

    let commands = client.guilds.cache.get(config.guildId)

   fs.readdir(__dirname + "/commands" , (err , data) =>{

        data.forEach(r => {

        const command = require(`./commands/${r}`)

        console.log(`Loaded ${command.name}`)

        commands?.create({name: command.name, description: command.description, options: command.options})

        })
    
    })

    })
    

client.on("interactionCreate", (interaction) =>{
    if(!interaction.isCommand()) return;
    
    fs.readdir(__dirname + "/commands", (err , data1) =>{
        data1.forEach(data =>{
      const command = require(`./commands/${data}`)
        if(interaction.commandName == command.name){
            let filter = interaction.options.getString("filter")
                command.run(interaction, client, filter)
        }
        })
        
    })

  })

client.on("interactionCreate" , async(i) =>{

    if(!i.isButton()) return;

    const filter = db.get("filter")
      if(i.customId == "lofi1"){

        let user = await i.member.fetch();

        const connection = voice.joinVoiceChannel({channelId: user.voice.channel.id, guildId: i.guild.id , adapterCreator: i.guild.voiceAdapterCreator})

        const resource = voice.createAudioResource("https://ec4d1aed-0f7b-4c62-9e9e-09af59ed1e12.id.repl.co/lofi/normal" + `?filter=${filter}`)

        const player = voice.createAudioPlayer()

        player.play(resource)

        connection.subscribe(player);

        embed("Normal", i)
      }else if(i.customId =="lofi2"){
        
        let user = await i.member.fetch();

        const connection = voice.joinVoiceChannel({channelId: user.voice.channel.id, guildId: i.guild.id , adapterCreator: i.guild.voiceAdapterCreator})

        const resource = voice.createAudioResource("https://ec4d1aed-0f7b-4c62-9e9e-09af59ed1e12.id.repl.co/lofi/hindi"+ `?filter=${filter}`)

        const player = voice.createAudioPlayer()

        player.play(resource)

        connection.subscribe(player);

        const embed = new Discord.MessageEmbed()

        .setTitle("Playing Lo-Fi")

        .setThumbnail("https://avatars.githubusercontent.com/u/96626911?s=200&v=4")

        .setDescription(`Playing Hindi Lo-Fi Station`)

        .setColor("#FF10F0")
        
        .setFooter("Made By Agent Hacker#0477")

        i.reply({embeds: [embed]})
        
      }else if(i.customId =="lofi3"){
            
        let user = await i.member.fetch();

        const connection = voice.joinVoiceChannel({channelId: user.voice.channel.id, guildId: i.guild.id , adapterCreator: i.guild.voiceAdapterCreator})

        const resource = voice.createAudioResource("https://ec4d1aed-0f7b-4c62-9e9e-09af59ed1e12.id.repl.co/lofi/live"+ `?filter=${filter}`)

        const player = voice.createAudioPlayer()

        player.play(resource)

        connection.subscribe(player);
        
        embed("Live", i)

      }else if(i.customId =="lofi4"){
            
        let user = await i.member.fetch();

        const connection = voice.joinVoiceChannel({channelId: user.voice.channel.id, guildId: i.guild.id , adapterCreator: i.guild.voiceAdapterCreator})

        const player = voice.createAudioPlayer()

        const resource = voice.createAudioResource("https://ec4d1aed-0f7b-4c62-9e9e-09af59ed1e12.id.repl.co/lofi/study"+ `?filter=${filter}`)

        player.play(resource)

        connection.subscribe(player);

        embed("Study", i)
            
      }

      db.set("filter", null)
    
    })

client.login(config.token)

async function embed(name, i){
    const embed = new Discord.MessageEmbed()
    .setTitle("Playing Lo-Fi")
    .setThumbnail("https://avatars.githubusercontent.com/u/96626911?s=200&v=4")
    .setDescription(`Playing ${name} Lo-Fi Station`)
    .setFooter("Made By Agent Hacker#0477")
    .setColor("#FF10F0")
    i.reply({embeds: [embed]})  
}
