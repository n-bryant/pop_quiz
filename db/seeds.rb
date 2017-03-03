require 'httparty'

Category.create(name: "music")

url = 'https://api.spotify.com/v1/tracks/'
track_ids = ['4vb4mFvYsr2h6enhjJsq9Y','3dhjNA0jGA8vHBQ1VdD6vV',
            '6cr6UDpkjEaMQ80OjWqEBQ', '6zeE5tKyr8Nu882DQhhSQI',
            '46eu3SBuFCXWsPT39Yg3tJ', '0PGwM5vdr5fMejx0IIAYXj',
            '42et6fnHCw1HIPSrdPprMl', '0ki28p3v35elzrc3th6y90',
            '1Je1IMUlBXcx1Fz0WE7oPT', '7s25THrKz86DM225dOYwnr',
            '2Uu8IiLkLY0UXhCHka4Dlr', '2Mpj1Ul5OFPyyP4wB62Rvi',
            '5wj4E6IsrVtn8IBJQOd0Cl', '0hKF8N8aflF1uDzEEnPr2j',
            '5jafMI8FLibnjkYTZ33m0c', '5PntSbMHC1ud6Vvl8x56qd',
            '460Wn6Dq2uMviG5nPXtPnb', '0ByMNEPAPpOR5H69DVrTNy',
            '4vp2J1l5RD4gMZwGFLfRAu', '6tS3XVuOyu10897O3ae7bi',
            '0rpIH5otu7ykvZPdcQuRPh', '6IwKcFdiRQZOWeYNhUiWIv',
            '4iNkk2qPPXC1MAZdVUq810', '4E6cwWJWZw2zWf7VFbH7wf',
            '2VRGC9H1a4TBaC22HIZ8Mv', '2TYC9SaRhYypUQzB1ZVTG2',
            '4TZZvblv2yzLIBk2JwJ6Un', '11EX5yhxr9Ihl3IN1asrfK',
            '0KpfYajJVVGgQ32Dby7e9i', '24lMtPOCzP5g4hrg3NklLa',
            '6ol4ZSifr7r3Lb2a9L5ZAB', '2Foc5Q5nqNiosCNqttzHof',
            '0Yo8GhK9HEaeIZetPARrW9', '03gqZZavMKhWbSjdQvpF6O',
            '5ghIJDpPoe3CfHMGu71E6T', '62nQ8UZVqR2RMvkJHkcO2o',
            '0uppYCG86ajpV2hSR3dJJ0', '74X1epeRufHckhuX1KFD04',
            '4YPhn26bIFm2KUkL1VLzQG', '45Ia1U4KtIjAPPU7Wv1Sea',
            '263aNAQCeFSWipk896byo6', '39sICagGOiysHxoIBRyLLi',
            '0fsz7tJ7UKXT9hliLfO7aE', '40bynawzslg9U7ACq07fAj',
            '3ZFwuJwUpIl0GeXsvF1ELf', '1Dr1fXbc2IxaK1Mu8P8Khz',
            '7yCPwWs66K8Ba5lFuU2bcx', '6VojZJpMyuKClbwyilWlQj',
            '3yrSvpt2l1xhsV9Em88Pul', '0Vpswx5knuuXW8HmNK1LrT',
            '2G2YzndIA6jeWFPBXhUjh5', '50uGbeaQIxKiSc7jvRTjWx',
            '2jg4Yc8071puvDRYi22B3a', '1CSLeVCXmetBh8IkTPMFdL',
            '0iOZM63lendWRTTeKhZBSC', '71KvnJWtIVW93D0EtvxqMC',
            '4tMxTsEPybFSX1dq7BOC4K', '4gxs9En3aoaOm2J5wNMMm9',
            '7haFcQaoTBr2qY6G0r4JSH', '5akBpqWmFWEHoBGRIrR5aK',
            '40riOy7x9W7GXjyGp4pjAv', '3LcYYV9ozePfgYYmXv0P3r',
            '2DnJjbjNTV9Nd5NOa1KGba', '6Xz7FeyE8HTP90HecgHV57',
            '0FeCO85RKW8fDRytwXof2x', '5tVA6TkbaAH9QMITTQRrNv',
            '7onOpypcFWFc2YjMIcJnx9', '2aoo2jlRnM3A0NyLQqMN2f',
            '1dv3ePjze9tPq2pk8eWJdR', '54eZmuggBFJbV7k248bTTt',
            '5ihS6UUlyQAfmp48eSkxuQ', '6UkMcAA19lTdjs22jtB7o2',
            '6vxHp3CDNo0afgKGp2yi1E', '3ftnDaaL02tMeOZBunIwls',
            '1aj4GXfmEYXfdVZohCpNKu', '7FwBtcecmlpc1sLySPXeGE',
            '2T5Ch09nefwckOu5NQvjIk', '1fDsrQ23eTAVFElUMaf38X',
            '2Q7LpkYrS0PBpoq3iCqypa', '1nbMkRhfldXcmCyB83x8lK',
            '41MOCUNOgWtaYBFUsGnpZ5', '4sscDOZCkbLSlDqcCgUJnX',
            '44hOGg1uFg1XJZGZYNwYmM', '0HEmnAUT8PHznIAAmVXqFJ',
            '0BB9eUBBaaX6GALSYNcEp7', '3S2R0EVwBSAVMd5UMgKTL0',
            '2k1np6GRFvKjgjYfo2g39B', '0TF3F5Lw5apoD1zvR8LikO',
            '0PlxkfQrCeE0XMqcjGlzsi', '4U3Ggqyv2XgnS1u82HOGQX',
            '648BMGrt98kUbLo24A4vgj', '2tY1gxCKslfXLFpFofYmJQ',
            '5ChkMS8OtdzJeqyybCc9R5', '57JVGBtBLCfHw2muk5416J',
            '5J0S5UgpCwlmEagrqgzvoC', '2o1dXMSuM4p6SsI2RREUL6',
            '0LN0ASTtcGIbNTnjSHG6eO', '0vLwL4xuJ3s7SeaCdvMqkY',
            '3eFTVoXqzK8JMDAZumfnuR', '5tzbM8m70V977Ezpfk8IPS',
            '5xl5582IihbEZAnfj0xyso', '5cP52DlDN9yryuZVQDg3iq',
            '1AhDOtG9vPSOmsWgNW0BEY', '5nPdMALTEd7HOjn16oNf2X',
            '300RfAPZ57B0y6YYj9n6DN', '7ePFDzrnLt3Ynqgy2UFWri',
            '3FmAUR4SPWa3P1KyDf21Fu', '51pQ7vY7WXzxskwloaeqyj',
            '3FCto7hnn1shUyZL42YgfO', '7pKfPomDEeI4TPT6EOYjn9',
            '5nNmj1cLH3r4aA4XDJ2bgY', '1k1Bqnv2R0uJXQN4u6LKYt',
            '02BDRKIiRLkXrlNPLlpH6K', '3vmjnUm9K6kXyzIxJHU9xG',
            '2nr6iUHCilKUfyL9CicbQE', '01iyCAUm8EvOFqVWYJ3dVX',
            '2DnJjbjNTV9Nd5NOa1KGba', '31HOUWxaaqIedY0fULlGa5',
            '54OR1VDpfkBuOY5zZjhZAY', '7DhnBXTRbyW3JRueLlOmLm',
            '3iJxloILmOu2NIRZ0OGyui', '04XdCMi1WhAjVyRJbAtaq0',
            '5QTEEImISE4USGEwqAci8O', '40b31eggZB30hoqXhGm4qc',
            '4MC8Oom2D2a7ZPQDpuVIYK', '3M8FzayQWtkvOhqMn2V4T2',
            '6jkNs6ZRiLjIk87MWmSGWu', '6VBy3FLlKZOWV85xmAXmr8',
            '4nXkbcTj3nyww1cHkw5RAP', '4QEbXYWpDDWHzXNINdZlzW',
            '50kpGaPAhYJ3sGmk6vplg0', '09CtPGIpYB4BrO8qb1RGsF']

track_ids.each do |id|
  result = HTTParty.get("#{url}#{id}")
  artist = result['artists'].first['name']
  track = result['name']
  album_name = result['album']['name']
  album_image = result['album']['images'].first['url']
  preview_url = result['preview_url']

  unless preview_url.nil? || artist.nil?
    Track.create(artist: artist, track: track, album_name: album_name, album_image: album_image, preview_url: preview_url)
  end
end
