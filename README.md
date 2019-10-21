# Teochew-Dictionary-Backend
Web API for [Teochew Pop-up Dictionary](https://github.com/paulronla/Teochew-Pop-up-Dictionary) 
and web app Teochew dictionary

This backend uses the Express framework and runs in a Docker container 
hosted on Google Cloud Run.

## Teochew Pop-up Dictionary API

**```www.teochewspot.com/extsearch/:simplified_Chinese/:traditional_Chinese```**

Teochew pronunciation look-ups are done through this route. 
The route returns JSON containing the Teochew pronunciations along with the 
filenames of the corresponding Teochew audio. The front-end caches the results 
so that only Chinese characters not visited before on this session ends up having an 
HTML request. Only one request is needed at most per pop-up to reduce UX latency issues.

**```www.teochewspot.com/audio/:audio_track```**

Teochew audio is served on this route. File names have 
been hashed with ```hash_audio_name.py``` from 
[Mandarin-to-Teochew-Mapper](https://github.com/paulronla/Mandarin-To-Teochew-Mapper) 
to make guessing the filenames more difficult.