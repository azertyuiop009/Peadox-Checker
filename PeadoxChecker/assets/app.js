function CheckTokens() {
    document.getElementById("results").classList.remove("hide");
    document.getElementById("results").classList.add("results");
    document.getElementById("tokens_list").classList.remove("input_tokens");
    document.getElementById("tokens_list").classList.add("hide");

    var input = document.getElementById("tokens").value.split("\n");

    input.forEach(token => {
        if (token.length == 59 || token.length == 88 || token.length == 70) {
            console.log(token)
            let xhr2 = new XMLHttpRequest();
            xhr2.open('GET', 'https://discord.com/api/v9/users/@me', true);
            xhr2.setRequestHeader('authorization', `${token}`)

xhr2.setRequestHeader('Access-Control-Allow-Origin', '*');
            xhr2.onload = function (d) {
                var l = JSON.parse(xhr2.response)

                if (xhr2.status == 200) {
                    
                    let xhr3 = new XMLHttpRequest();
                    xhr3.open('GET', 'https://discord.com/api/v9/users/@me/affinities/users', true);
                    xhr3.setRequestHeader('authorization', `${token}`)
xhr3.setRequestHeader('Access-Control-Allow-Origin', '*');
                  
                    xhr3.onload = function (d) {
                        let res = JSON.parse(xhr3.response)
                        if(xhr3.status !== 403){
                            username = l.username + "#" + l.discriminator
                            if (l.avatar == null) {
                                document.getElementById("valid_tokens").innerHTML +=
                                    `<div class="account">
                                        <div class="box">
                                            <img src="./assets/Default.png" alt="User Avatar">
                                        </div>
                                        <div class="box">
                                            <span>${username}</span>
                                            <p>${token}</p>
                                        </div>
                                    </div>`
                            } else {
                                var id = l.id
                                var scd = l.avatar
                                var avatar = `https://cdn.discordapp.com/avatars/${id}/${scd}`;
                                document.getElementById("valid_tokens").innerHTML +=
                                    `<div class="account">
                                        <div class="box">
                                            <img src="${avatar}" alt="User Avatar">
                                        </div>
                                        <div class="box">
                                            <span>${username}</span>
                                            <p>${token}</p>
                                        </div>
                                    </div>`
                            }
                        }else{
                            username = l.username + "#" + l.discriminator
                            var id = l.id
                            var scd = l.avatar
                            var avatar = `https://cdn.discordapp.com/avatars/${id}/${scd}`;
                            document.getElementById("locked_tokens").innerHTML +=
                                `<div class="account">
                                    <div class="box">
                                        <img src="${avatar}" alt="User Avatar">
                                    </div>
                                    <div class="box">
                                        <span>${username}</span>
                                        <p>${token}</p>
                                    </div>
                                </div>`
                        }
                        
                    }
                    xhr3.send()
                }
                    if (xhr2.status == 403) {
                        username = l.username + "#" + l.discriminator
                        if (l.avatar == null) {
                            document.getElementById("locked_tokens").innerHTML +=
                                `<div class="account">
                                    <div class="box">
                                        <img src="./assets/Default.png" alt="User Avatar">
                                    </div>
                                    <div class="box">
                                        <span>${username}</span>
                                        <p>${token}</p>
                                    </div>
                                </div>`
                        } else {
                            var id = l.id
                            var scd = l.avatar
                            var avatar = `https://cdn.discordapp.com/avatars/${id}/${scd}`;
                            document.getElementById("locked_tokens").innerHTML +=
                                `<div class="account">
                                    <div class="box">
                                        <img src="${avatar}" alt="User Avatar">
                                    </div>
                                    <div class="box">
                                        <span>${username}</span>
                                        <p>${token}</p>
                                    </div>
                                </div>`
                        }
                    }
                    console.log(l)

                }
                if (xhr2.status == 401) {
                    document.getElementById("invalid_tokens").innerHTML +=
                        `<div class="account">
                            <div class="box">
                                <img src="./assets/Default.png" alt="User Avatar">
                            </div>
                            <div class="box">
                                <span>XXXXX#0000</span>
                                <p>${token}</p>
                            </div>
                        </div>`
                }
                xhr2.send();
            } else {
                document.getElementById("invalid_tokens").innerHTML +=
                    `<div class="account">
                    <div class="box">
                        <img src="./assets/Default.png" alt="User Avatar">
                    </div>
                    <div class="box">
                        <span>XXXXX#0000</span>
                        <p>${token}</p>
                    </div>
                </div>`
            }
        });
}