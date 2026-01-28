-- =========================
-- GUESTHOST LOADER
-- =========================

-- BASE (NÃO MUDA)
local BaseURL = "https://foreverop.github.io/GuestHost/"

-- MUDE APENAS AQUI 👇
local ScriptID = "0" -- 0, 1, 2, 3, 4...

-- LINK FINAL
local RawURL = BaseURL .. ScriptID .. ".lua"

-- LOAD
local success, err = pcall(function()
    loadstring(game:HttpGet(RawURL))()
end)

if not success then
    warn("Erro ao carregar script:", err)
end