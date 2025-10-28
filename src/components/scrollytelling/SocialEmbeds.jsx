import { useState, useEffect } from 'react'
import { Play, ExternalLink, Video } from 'lucide-react'
import { useTranslation } from 'react-i18next'

// Instagram Embed Component
export const InstagramEmbed = ({ postUrl, embedId, caption, fallbackImage }) => {
  const [embedHtml, setEmbedHtml] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchInstagramEmbed = async () => {
      try {
        // Try Instagram oEmbed API
        const response = await fetch(
          `https://graph.facebook.com/v18.0/instagram_oembed?url=${encodeURIComponent(postUrl)}&access_token=${import.meta.env.VITE_INSTAGRAM_TOKEN}`
        )
        
        if (response.ok) {
          const data = await response.json()
          setEmbedHtml(data.html)
        } else {
          throw new Error('Instagram API failed')
        }
      } catch (err) {
        console.warn('Instagram embed failed, using fallback:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    if (postUrl && import.meta.env.VITE_INSTAGRAM_TOKEN) {
      fetchInstagramEmbed()
    } else {
      setError(true)
      setLoading(false)
    }
  }, [postUrl])

  if (loading) {
    return <EmbedSkeleton />
  }

  if (error || !embedHtml) {
    return <InstagramFallback postUrl={postUrl} caption={caption} fallbackImage={fallbackImage} />
  }

  return (
    <div className="instagram-embed">
      <div dangerouslySetInnerHTML={{ __html: embedHtml }} />
    </div>
  )
}

// Instagram Fallback Component
const InstagramFallback = ({ postUrl, caption, fallbackImage }) => {
  const { t } = useTranslation()

  return (
    <div className="instagram-fallback bg-white rounded-lg shadow-lg p-4 max-w-md mx-auto border">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <Video className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="font-semibold text-sm">Instagram Reel</p>
          <p className="text-xs text-gray-500">Eyewitness footage</p>
        </div>
      </div>
      
      <div className="aspect-[9/16] bg-gradient-to-b from-purple-100 to-pink-100 rounded-lg flex items-center justify-center mb-3 relative overflow-hidden">
        {fallbackImage ? (
          <img src={fallbackImage} alt={t('hero.socialAltInstagram')} className="w-full h-full object-cover" />
        ) : (
          <div className="text-center z-10">
            <Play className="w-12 h-12 text-purple-600 mx-auto mb-2" />
            <p className="text-sm text-purple-800 font-medium">Instagram Reel</p>
            <p className="text-xs text-purple-600 px-4">{caption}</p>
          </div>
        )}
      </div>
      
      <a 
        href={postUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-purple-600 hover:text-purple-800 text-sm font-medium"
      >
        <ExternalLink className="w-4 h-4" />
        View on Instagram
      </a>
    </div>
  )
}

// TikTok Embed Component
export const TikTokEmbed = ({ videoUrl, caption, fallbackImage }) => {
  const [embedData, setEmbedData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchTikTokEmbed = async () => {
      try {
        const response = await fetch(
          `https://www.tiktok.com/oembed?url=${encodeURIComponent(videoUrl)}`
        )
        
        if (response.ok) {
          const data = await response.json()
          setEmbedData(data)
        } else {
          throw new Error('TikTok API failed')
        }
      } catch (err) {
        console.warn('TikTok embed failed, using fallback:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    if (videoUrl) {
      fetchTikTokEmbed()
    } else {
      setError(true)
      setLoading(false)
    }
  }, [videoUrl])

  if (loading) {
    return <EmbedSkeleton />
  }

  if (error || !embedData) {
    return <TikTokFallback videoUrl={videoUrl} caption={caption} fallbackImage={fallbackImage} />
  }

  return (
    <div className="tiktok-embed">
      <div dangerouslySetInnerHTML={{ __html: embedData.html }} />
    </div>
  )
}

// TikTok Fallback Component
const TikTokFallback = ({ videoUrl, caption, fallbackImage }) => {
  const { t } = useTranslation()

  return (
    <div className="tiktok-fallback bg-black rounded-lg shadow-lg p-4 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 bg-black border border-white rounded-full flex items-center justify-center">
          <Video className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="font-semibold text-sm text-white">TikTok Video</p>
          <p className="text-xs text-gray-400">Live coverage</p>
        </div>
      </div>
      
      <div className="aspect-[9/16] bg-gray-900 rounded-lg flex items-center justify-center mb-3 relative overflow-hidden">
        {fallbackImage ? (
          <img src={fallbackImage} alt={t('hero.socialAltTikTok')} className="w-full h-full object-cover" />
        ) : (
          <div className="text-center z-10">
            <Play className="w-12 h-12 text-pink-400 mx-auto mb-2" />
            <p className="text-sm text-white font-medium">TikTok Video</p>
            <p className="text-xs text-gray-300 px-4">{caption}</p>
          </div>
        )}
      </div>
      
      <a 
        href={videoUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-pink-400 hover:text-pink-300 text-sm font-medium"
      >
        <ExternalLink className="w-4 h-4" />
        View on TikTok
      </a>
    </div>
  )
}

// Loading Skeleton
const EmbedSkeleton = () => {
  return (
    <div className="embed-skeleton max-w-md mx-auto">
      <div className="animate-pulse">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="space-y-1">
            <div className="h-3 bg-gray-300 rounded w-20"></div>
            <div className="h-2 bg-gray-300 rounded w-16"></div>
          </div>
        </div>
        <div className="aspect-[9/16] bg-gray-300 rounded-lg mb-3"></div>
        <div className="h-4 bg-gray-300 rounded w-24"></div>
      </div>
    </div>
  )
}