const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
const { getPokemon } = require('./utils/pokemon');
client.login('NzgxNzQ5NjY5MjE4NDg0MjM0.X8CLHQ.ymyieI6kG0xip9pVH_UbXs0SvEI');

client.on('ready', () => console.log(`${client.user.tag} has logged in.`));

client.on('message', async message => {
    if(message.author.bot) return;
    if(message.content.toLowerCase().startsWith('!p') | message.content.toLowerCase().startsWith('!pokemon')) {
        const pokemon = message.content.toLowerCase().split(" ")[1];
        try {
            const pokeData = await getPokemon(pokemon);
            const { 
                sprites, 
                stats,
                hp,
                weight,
                name, 
                id, 
                base_experience,
                abilities,
                types,
                height
            } = pokeData;
            const embed = new MessageEmbed();
            embed.setColor('#FFFF00')
            embed.setTitle(`<:masterball:783443157970845757> **N°${id} - ${name.toUpperCase()}**`)
            embed.setDescription('__POKEDEX__')
            embed.setThumbnail(`${sprites.front_default}`);
            stats.forEach(stat => embed.addField(`**${stat.stat.name.toUpperCase()}**`, `**${stat.base_stat}**`, true));
            types.forEach(type => embed.addField('**Type**', `**${type.type.name.toUpperCase()}**`, true));
            embed.addField('**Weight**', `**${weight/10} kg**`, true);
            embed.addField('**Height**', `**${height/10} m**`, true);
            embed.addField('**Base Experience**', `**${base_experience}**`, true);
            message.channel.send(embed);
        }
        catch(err) {
            message.channel.send(`Pokemon ${pokemon} does not exist.`);
          throw(err)
        }
    }
});