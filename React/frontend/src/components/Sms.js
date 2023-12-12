export default function  Sms({ emojiWraper, text, emoji }) {
    console.log(text );
    return <div>{ emojiWraper ?  ((!emoji || !emoji.trim()) ? emojiWraper(text, '❤️') : emojiWraper(text, emoji)) : text }</div>;
}