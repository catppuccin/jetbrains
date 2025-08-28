set windows-shell := ["powershell.exe", "-NoLogo","-Command"]

default:
  just --list

build:
  whiskers ui.theme.tera
  whiskers editor.tera
