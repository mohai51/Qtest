async function generateStory() {
    const user = document.getElementById('user').value;
    const partner = document.getElementById('partner').value;
    const output = document.getElementById('output');
    
    output.innerText = "গল্প লেখা হচ্ছে... একটু অপেক্ষা করুন।";

    // প্রম্পটটিকে মজার করার জন্য নিচের স্টাইল ব্যবহার করো
    const funnyPrompt = `Write a 5-page funny and heartwarming Qurbani story in Bengali. 
    The main characters are ${user} and ${partner}. 
    Context: Bangladeshi Qurbani Eid culture (Haat, funny incidents with the cow, cooking). 
    Make it humorous and engaging for a social media audience.`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_API_KEY`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                contents: [{ parts: [{ text: funnyPrompt }] }]
            })
        });

        const data = await response.json();
        const story = data.candidates[0].content.parts[0].text;
        
        // গল্পটিকে সুন্দর করে স্ক্রিনে দেখানো
        output.innerHTML = `<h3>আপনার জন্য বিশেষ গল্প:</h3><p>${story.replace(/\n/g, '<br>')}</p>`;
    } catch (error) {
        output.innerText = "দুঃখিত, এখন গল্প লেখা সম্ভব হচ্ছে না। পরে চেষ্টা করুন।";
    }
}