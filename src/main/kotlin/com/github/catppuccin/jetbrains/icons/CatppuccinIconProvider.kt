package com.github.catppuccin.jetbrains.icons

import com.intellij.ide.IconProvider
import com.intellij.psi.PsiElement
import com.intellij.psi.util.PsiUtilCore
import javax.swing.Icon

class CatppuccinIconProvider : IconProvider() {
    override fun getIcon(element: PsiElement, flags: Int): Icon? {
        var icon: Icon? = null
        val virtualFile = PsiUtilCore.getVirtualFile(element)

        if (virtualFile != null) {
            val fileName = virtualFile.name
            if (fileName.endsWith(".md")) {
                icon = CatppuccinIcons.MARKDOWN_FILE;
            }
        }

        return icon
    }
}
