if (!message.guild.me.hasPermission('MANAGE_ROLES')) {
    return message.channel.send("I need the mange roles permission for this command to work!")
};
// and check the member's permissions:
if (!message.member.hasPermission('MANAGE_GUILD')) {
    message.reply("You can't use this command!")
};

getUserFromMention = (mention) => {
	if (!mention) return; // If there isn't a mention do nothing
	if (mention.startsWith('<@') && mention.endsWith('>')) { // checking the "mention" starts and ends with <@ and >
			mention = mention.slice(2, -1); // if yes, cut off the <@ and >
			if (mention.startsWith('!')) { //if it starts with ! then cut that off too 
					mention = mention.slice(1);
			};
			return client.users.cache.get(mention);
	};		
};

let toMute;
    toMute = message.guild.member(getUserFromMention(args[0]));
if (!toMute) toBan = message.guild.members.cache.get(args[0]);
if (!toMute) return message.channel.send(`I can't find that user.`);

let muteRole = message.guild.roles.cache.find(role => role.name.toLowerCase() == "muted");
if (!muteRole) {
    return message.channel.send("Aw, snap! I can't find a mute role in this server...")
};

toMute.roles.add(muteRole.id)
    .catch((error) => {
        console.error(error);
       return message.reply(`Uh-oh. There was an error whilst adding the ${muteRole.name} role to ${toMute.user.tag}! (\`Error: ${error}\`)`)
    });
message.channel.send(`${toMute.user.tag} has been muted.`)
